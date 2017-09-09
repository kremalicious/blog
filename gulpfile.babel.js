import fs from 'fs'
import {src, dest, parallel, series, watch} from 'gulp'
import del from 'del'
import parallelize from 'concurrent-transform'
import browser from 'browser-sync'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import critical from 'critical'
import request from 'request'

import yaml from 'js-yaml'
import chalk from 'chalk'
import yargs from 'yargs'

// Required for mixing old and ES6+ js with ugify-js 3
import uglifyjs from 'uglify-es'
import composer from 'gulp-uglify/composer'

// Get all the configs: `pkg` and `site`
import pkg from './package'

const site = yaml.safeLoad(fs.readFileSync('./_config.yml'))

// Load plugins
const spawn = require('child_process').spawn
const $ = require('gulp-load-plugins')()

// Custom minify
const minify = composer(uglifyjs, console)

// Handle errors
const onError = error => {
    console.log($.util.colors.red('\nYou fucked up:', error.message, 'on line', error.lineNumber, '\n'))
    this.emit('end')
}

// 'development' is just default, production overrides are triggered
// by adding the production flag to the gulp command e.g. `gulp build --production`
const argv = yargs.parse(process.argv.slice(1))
const isProduction = argv.production


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Terminal Banner
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log('')
console.log(chalk.dim('   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>'))
console.log('')
console.log(chalk.cyan('      (o) Just what do you think you\'re doing,', process.env.USER, '?    '))
console.log('')
console.log(chalk.dim('   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>'))
console.log('')


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Port to use for the development server.
const PORT = 1337

// Paths
const SRC = site.source
const DIST = site.destination

// Deployment
const S3BUCKET = 'kremalicious.com'
const S3PATH = '/'
const S3REGION = 'eu-central-1'

// SVG sprite
const SPRITECONFIG = {
    dest: DIST + '/assets/img/',
    mode: {
        symbol: {
            dest: './',
            sprite: 'sprite.svg'
        }
    }
}

// Code banner
const BANNER = [
    '/**',
    ' ** <%= pkg.name %> v<%= pkg.version %>',
    ' ** <%= pkg.description %>',
    ' ** <%= pkg.homepage %>',
    ' **',
    ' ** <%= pkg.author.name %> <<%= pkg.author.email %>>',
    ' **',
    ' ** YOU EARNED THE GEEK ACHIEVEMENT ',
    ' ** FOR LOOKING AT MY SOURCE ',
    ' **',
    ' ** But because of all the minimizing and caching ',
    ' ** going on you better check out the code on ',
    ' ** github ',
    ' ** ',
    ' ** <%= pkg.repository.url %> ',
    ' **/',
    ''
].join('\n')


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Tasks
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//
// Delete build artifacts
//
export const clean = () =>
    del([
        DIST + '**/*',
        DIST + '.*', // Delete all hidden files
        '!' + DIST + '/media'
    ])


//
// Jekyll
//
export const jekyll = done => {
    browser.notify('Compiling Jekyll')

    let jekyllOptions

    if (isProduction) {
        process.env.JEKYLL_ENV = 'production'
        jekyllOptions = 'jekyll build --lsi'
    } else {
        process.env.JEKYLL_ENV = 'development'
        jekyllOptions = 'jekyll build --config _config.yml,_config.dev.yml --incremental --drafts --future'
    }

    const jekyllInstance = spawn('bundle', ['exec', jekyllOptions], {stdio: 'inherit'})

    jekyllInstance.on('error', error => onError(error)).on('close', done)
}


//
// HTML
//
export const html = () => src(DIST + '/**/*.html')
    .pipe($.if(isProduction, $.htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        useShortDoctype: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        minifyJS: true,
        minifyCSS: true
    })))
    .pipe(dest(DIST))


//
// Styles
//
const processors = [
    autoprefixer(),
    cssnano()
]

export const css = () =>
    src([
        SRC + '/_assets/styl/kremalicious3.styl',
        SRC + '/_assets/styl/post-*.styl'
    ])
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.stylus({'include css': true})).on('error', onError)
    .pipe($.postcss(processors)).on('error', onError)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.header(BANNER, {pkg})))
    .pipe($.rename({suffix: '.min'}))
    .pipe(dest(DIST + '/assets/css/'))
    .pipe(browser.stream())

// Inline critical-path CSS
export const criticalCss = done => {
    if (isProduction) {
        critical.generate({
            base: DIST,
            src: 'index.html',
            dest: 'index.html',
            inline: true,
            minify: true,
            dimensions: [{
                height: 320,
                width: 480
            }, {
                height: 600,
                width: 650
            }, {
                height: 700,
                width: 960
            }, {
                height: 900,
                width: 1400
            }]
        })
    }
    done()
}


//
// Scripts
//
export const js = () =>
    src([
        SRC + '/_assets/js/*.js',
        '!' + SRC + '/_assets/js/_*.js',
        'node_modules/picturefill/dist/picturefill.js'
    ])
    .pipe($.sourcemaps.init())
    .pipe($.include({
        includePaths: ['node_modules', SRC + '/_assets/js']
    })).on('error', onError)
    .pipe($.if(isProduction, minify())).on('error', onError)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe($.if(isProduction, $.header(BANNER, {pkg})))
    .pipe($.rename({suffix: '.min'}))
    .pipe(dest(DIST + '/assets/js/'))


//
// Images
//
const imageminPlugins = [
    $.imagemin.gifsicle({interlaced: true}),
    $.imagemin.jpegtran(),
    $.imagemin.optipng({optimizationLevel: 5}),
    $.imagemin.svgo({plugins: [{removeViewBox: false}]})
]

// Copy all images
export const images = () => src(SRC + '/_assets/img/**/*')
    .pipe($.if(isProduction, $.imagemin(imageminPlugins)))
    .pipe(dest(DIST + '/assets/img/'))

// SVG sprite
export const svg = () => src(SRC + '/_assets/img/**/*.svg')
    .pipe($.if(isProduction, $.imagemin(imageminPlugins)))
    .pipe($.svgSprite(SPRITECONFIG))
    .pipe(dest(DIST + '/assets/img/'))


//
// Copy fonts
//
export const fonts = () => src(SRC + '/_assets/fonts/**/*')
    .pipe(dest(DIST + '/assets/fonts/'))


//
// Copy media
//
export const media = () => src(SRC + '/_media/**/*')
    .pipe(dest(DIST + '/media/'))


//
// Revision static assets
//
export const rev = done => {
    // Globbing is slow so do everything conditionally for faster dev build
    if (isProduction) {
        return src(DIST + '/assets/**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff,woff2}')
            .pipe($.rev())
            .pipe(dest(DIST + '/assets/'))
            // Output rev manifest for next replace task
            .pipe($.rev.manifest())
            .pipe(dest(DIST + '/assets/'))
    }
    done()
}


//
// Replace all links to assets in files
// from a manifest file
//
export const revReplace = done => {
    // Globbing is slow so do everything conditionally for faster dev build
    if (isProduction) {
        const manifest = src(DIST + '/assets/rev-manifest.json')

        return src(DIST + '/**/*.{html,css,js}')
            .pipe($.revReplace({manifest}))
            .pipe(dest(DIST))
    }
    done()
}


//
// Ping search engines
//
export const seo = done => {
    const googleUrl = 'http://www.google.com/webmasters/tools/ping?sitemap='
    const bingUrl = 'http://www.bing.com/webmaster/ping.aspx?siteMap='

    const response = (error, response) => {
        if (error) {
            console.log(chalk.red(error))
        } else {
            console.log(chalk.dim('Status:', response && response.statusCode))

            if (response.statusCode === 200) {
                console.log(chalk.green('Successfully notified'))
            }
        }
    }

    request(googleUrl + site.url + '/sitemap.xml', response)
    request(bingUrl + site.url + '/sitemap.xml', response)

    done()
}


//
// Dev Server
//
export const server = done => {
    browser.init({
        server: DIST,
        port: PORT,
        reloadDebounce: 2000
    })
    done()
}


//
// Watch for file changes
//
export const watchSrc = () => {
    watch(SRC + '/_assets/styl/**/*.styl').on('all', series(css))
    watch(SRC + '/_assets/js/**/*.js').on('all', series(js, browser.reload))
    watch(SRC + '/_assets/img/**/*.{png,jpg,jpeg,gif,webp}').on('all', series(images, browser.reload))
    watch(SRC + '/_assets/img/**/*.{svg}').on('all', series(svg, browser.reload))
    watch(SRC + '/_media/**/*').on('all', series(media, browser.reload))
    watch([SRC + '/**/*.{html,xml,json,txt,md,yml}', './*.yml', SRC + '_includes/svg/*']).on('all', series('build', browser.reload))
}


//
// Build banner
//
export const buildBanner = done => {
    console.log(chalk.dim('   ------------------------------------------'))
    console.log(chalk.green('          Building ' + (isProduction ? 'production' : 'dev') + ' version...'))
    console.log(chalk.dim('   ------------------------------------------'))

    done()
}


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Collection tasks
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//
// Full build
//
// `gulp build` is the development build
// `gulp build --production` is the production build
//
export const build = series(
    buildBanner,
    clean,
    jekyll,
    parallel(html, css, js, svg, images, fonts, media),
    rev,
    revReplace,
    criticalCss
)


//
// Build site, run server, and watch for file changes
//
// `gulp dev`
//
export const dev = series(build, server, watchSrc)

// Set `gulp dev` as default: `gulp`
export default dev


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Deployment
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// create publisher, define config
const publisher = $.awspublish.create({
    params: {
        Bucket: S3BUCKET
    },
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: S3REGION
})

export const s3 = () => src(DIST + '/**/*')
    .pipe($.awspublishRouter({
        cache: {
            // Cache for 5 minutes by default
            cacheTime: 300
        },
        routes: {
            // All static assets, cached & gzipped
            '^assets/(?:.+)\\.(?:js|css|png|jpg|jpeg|gif|ico|svg|ttf|eot|woff|woff2)$': {
                cacheTime: 2592000, // Cache for 1 month
                gzip: true
            },

            // Every other asset, cached
            '^assets/.+$': {
                cacheTime: 2592000  // Cache for 1 month
            },

            // All html files, not cached & gzipped
            '^.+\\.html': {
                cacheTime: 0,
                gzip: true
            },

            // Font mime types
            '.ttf$': {
                key: '$&',
                headers: {'Content-Type': 'application/x-font-ttf'}
            },
            '.woff$': {
                key: '$&',
                headers: {'Content-Type': 'application/x-font-woff'}
            },
            '.woff2$': {
                key: '$&',
                headers: {'Content-Type': 'application/x-font-woff2'}
            },

            // Pass-through for anything that wasn't matched by routes above, to be uploaded with default options
            '^.+$': '$&'
        }
    }))
    // Make sure everything goes to the root '/'
    .pipe($.rename(path => {
        path.dirname = S3PATH + path.dirname
    }))
    .pipe(parallelize(publisher.publish(), 100))
    .pipe(publisher.sync()) // Delete files in bucket that are not in local folder
    .pipe($.awspublish.reporter({
        states: ['create', 'update', 'delete']
    }))

// `gulp deploy`
export const deploy = series(s3)
