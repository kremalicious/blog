'use strict'

// load plugins
const $ = require('gulp-load-plugins')()

// manually import modules that won't get picked up by gulp-load-plugins
import gulp from 'gulp'
import del from 'del'
import pkg from './package.json'
import parallelize from 'concurrent-transform'
import browser from 'browser-sync'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

// handle errors
const onError = (error) => {
    $.util.log('')
    $.util.log($.util.colors.red('You fucked up:', error.message, 'on line' , error.lineNumber))
    $.util.log('')
    this.emit('end')
}

// 'development' is just default, production overrides are triggered
// by adding the production flag to the gulp command e.g. `gulp build --production`
const isProduction = ($.util.env.production === true ? true : false)

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Terminal Banner
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log("")
console.log($.util.colors.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))
console.log("")
console.log($.util.colors.cyan("      (o) Just what do you think you're doing,", process.env.USER, "?    "))
console.log("")
console.log($.util.colors.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"))
console.log("")

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Port to use for the development server.
const PORT = 1337

// Browsers to target when prefixing CSS.
const COMPATIBILITY = ['last 2 versions', 'ie >= 10']

// paths
const SRC       = '_src',
      DIST      = '_site',
      S3BUCKET  = 'kremalicious.com',
      S3PATH    = '/',
      S3REGION  = 'eu-central-1'

// icons
const ICONS = {
    entypo: {
        src: SRC + '/_assets/icons/entypo/',
        dist: DIST + '/assets/img/',
        prefix: 'entypo-',
        icons: [
            'twitter', 'facebook', 'google+', 'magnifying-glass', 'rss', 'link', 'arrow-with-circle-down', 'forward', 'heart', 'info-with-circle', 'infinity', 'github', 'chevron-right', 'chevron-left', 'eye', 'bitcoin'
        ]
    }
}

const iconset = ICONS.entypo

// Iterate through the icon set array
iconset.icons.forEach(function(icon, i, icons) {
    icons[i] = iconset.src + icon + '.svg'
})

// SVG sprite
const SPRITE = {
    dest: DIST + '/assets/img/',
    mode: {
        symbol: {
            dest: './',
            sprite: 'sprite.svg'
        }
    }
}

// code banner
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
// gulp tasks
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Full build
//
// `gulp build` is the development build
// `gulp build --production` is the production build
//
gulp.task('build', gulp.series(
    buildBanner, clean, jekyll,
    gulp.parallel(html, css, js, images, icons, fonts, media),
    rev, revReplace
))

function buildBanner(done) {
    console.log($.util.colors.gray("         ------------------------------------------"))
    console.log($.util.colors.green('                Building ' + ($.util.env.production ? 'production' : 'dev') + ' version...'))
    console.log($.util.colors.gray("         ------------------------------------------"))

    done()
}


//
// Build site, run server, and watch for file changes
//
gulp.task('default', gulp.series('build', server, watch))



// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Functions
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Delete build artifacts
//
function clean(done) {
    return del([
        DIST + '**/*',
        DIST + '.*', // delete all hidden files
        '!' + DIST + '/media/**'
    ])

    done()
}


//
// Jekyll
//
function jekyll(done) {

    browser.notify('Compiling Jekyll')

    if (isProduction) {
        process.env.JEKYLL_ENV = 'production'
        var jekyll_options = 'jekyll build --lsi'
    } else {
        var jekyll_options = 'jekyll build --config _config.yml,_config.dev.yml --incremental --drafts --future'
    }

    var spawn  = require('child_process').spawn,
        jekyll = spawn('bundle', ['exec', jekyll_options], { stdio: 'inherit' })

    return jekyll
        .on('error', (error) => onError() )
        .on('close', done)
}


//
// HTML
//
function html() {
    return gulp.src(DIST + '/**/*.html')
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
        .pipe(gulp.dest(DIST))
}


//
// Styles
//
function css() {

    var processors = [
        autoprefixer({ browsers: COMPATIBILITY }),
        cssnano()
    ]

    return gulp.src([
            SRC + '/_assets/styl/kremalicious3.styl',
            SRC + '/_assets/styl/post-*.styl'
        ])
        .pipe($.if(!isProduction, $.sourcemaps.init()))
        .pipe($.stylus({ 'include css': true })).on('error', onError)
        .pipe($.postcss(processors)).on('error', onError)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST + '/assets/css/'))
        .pipe(browser.stream())
}


//
// Scripts
//

// Libraries
function jsLibraries() {
    return gulp.src([
            'node_modules/picturefill/dist/picturefill.js'
        ])
        .pipe($.if(isProduction, $.uglify())).on('error', onError)
        .pipe($.rename({ suffix: '.min'}))
        .pipe(gulp.dest(DIST + '/assets/js/'))
}

// Project js
function jsProject() {
    return gulp.src(SRC + '/_assets/js/kremalicious3.js')
        .pipe($.sourcemaps.init())
        .pipe($.include()).on('error', onError)
        .pipe($.if(isProduction, $.uglify())).on('error', onError)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(DIST + '/assets/js/'))
}

// Service Worker js
function jsSW() {
    return gulp.src(DIST + '/service-worker.js')
        .pipe($.if(isProduction, $.uglify({
            compress: {
                drop_console: true
            }
        }))).on('error', onError)
        .pipe(gulp.dest(DIST + '/'))
}

// Collect all script tasks
function js() {
    return jsLibraries(), jsProject(), jsSW()
}


//
// Icons
//
function icons() {
    return gulp.src(iconset.icons)
        .pipe($.rename({ prefix: iconset.prefix }))
        .pipe(gulp.dest(iconset.dist))
        .pipe($.filter('**/*.svg'))
        .pipe($.if(isProduction, $.imagemin({ svgoPlugins: [{ removeViewBox: false }] })))
        .pipe($.svgSprite(SPRITE))
        .pipe(gulp.dest(iconset.dist))
}


//
// Copy images
//
function images() {
    return gulp.src([
        SRC + '/_assets/img/**/*',
        '!' + SRC + '/_assets/img/entypo/**/*'
    ])
    .pipe($.if(isProduction, $.imagemin({
        optimizationLevel: 5, // png
        progressive: true, // jpg
        interlaced: true, // gif
        multipass: true, // svg
        svgoPlugins: [{ removeViewBox: false }]
    })))
    .pipe(gulp.dest(DIST + '/assets/img/'))
}


//
// Copy fonts
//
function fonts() {
    return gulp.src(SRC + '/_assets/fonts/**/*')
        .pipe(gulp.dest(DIST + '/assets/fonts/'))
}


//
// Copy media
//
function media() {
    return gulp.src(SRC + '/_media/**/*')
        .pipe(gulp.dest(DIST + '/media/'))
}


//
// Revision static assets
//
function rev(done) {
    // globbing is slow so do everything conditionally for faster dev build
    if (isProduction) {
        return gulp.src(DIST + '/assets/**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff,woff2}')
            .pipe($.if(isProduction, $.rev()))
            .pipe(gulp.dest(DIST + '/assets/'))
            // output rev manifest for next replace task
            .pipe($.if(isProduction, $.rev.manifest()))
            .pipe(gulp.dest(DIST + '/assets/'))
    }
    done()
}


//
// Replace all links to assets in files
// from a manifest file
//
function revReplace(done) {
    // globbing is slow so do everything conditionally for faster dev build
    if (isProduction) {
        var manifest = gulp.src(DIST + '/assets/rev-manifest.json')
        return gulp.src(DIST + '/**/*.{html,xml,txt,json,css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
            .pipe($.if(isProduction, $.revReplace({ manifest: manifest })))
            .pipe(gulp.dest(DIST))
    }
    done()
}


//
// Dev Server
//
function server(done) {
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
function watch() {
    gulp.watch(SRC + '_assets/styl/**/*.styl').on('all', gulp.series(css))
    gulp.watch(SRC + '_assets/js/**/*.js').on('all', gulp.series(js, browser.reload))
    gulp.watch(SRC + '_assets/img/**/*.{png,jpg,jpeg,gif,webp}').on('all', gulp.series(images, browser.reload))
    gulp.watch(SRC + '_assets/img/**/*.{svg}').on('all', gulp.series(icons, browser.reload))
    gulp.watch(SRC + '_media/**/*').on('all', gulp.series(media, browser.reload))
    gulp.watch([SRC + '/**/*.{html,xml,json,txt,md,yml}', './*.yml', SRC + '_includes/svg/*']).on('all', gulp.series('build', browser.reload))
}


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Deployment
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

gulp.task('deploy', (done) => {

    // create publisher, define config
    var publisher = $.awspublish.create({
        params: {
            'Bucket': S3BUCKET
        },
        'accessKeyId': process.env.AWS_ACCESS_KEY,
        'secretAccessKey': process.env.AWS_SECRET_KEY,
        'region': S3REGION
    })

    return gulp.src(DIST + '/**/*')
        .pipe($.awspublishRouter({
            cache: {
                // cache for 5 minutes by default
                cacheTime: 300
            },
            routes: {
                // all static assets, cached & gzipped
                '^assets/(?:.+)\\.(?:js|css|png|jpg|jpeg|gif|ico|svg|ttf|eot|woff|woff2)$': {
                    cacheTime: 2592000, // cache for 1 month
                    gzip: true
                },

                // every other asset, cached
                '^assets/.+$': {
                    cacheTime: 2592000  // cache for 1 month
                },

                // all html files, not cached & gzipped
                '^.+\\.html': {
                    cacheTime: 0,
                    gzip: true
                },

                // font mime types
                '\.ttf$': {
                    key: '$&',
                    headers: { 'Content-Type': 'application/x-font-ttf' }
                },
                '\.woff$': {
                    key: '$&',
                    headers: { 'Content-Type': 'application/x-font-woff' }
                },
                '\.woff2$': {
                    key: '$&',
                    headers: { 'Content-Type': 'application/x-font-woff2' }
                },

                // pass-through for anything that wasn't matched by routes above, to be uploaded with default options
                "^.+$": "$&"
            }
        }))
        // make sure everything goes to the root '/'
        .pipe($.rename(function (path) {
            path.dirname = S3PATH + path.dirname
        }))
        .pipe(parallelize(publisher.publish(), 100))
        .pipe(publisher.sync()) // delete files in bucket that are not in local folder
        .pipe($.awspublish.reporter({
            states: ['create', 'update', 'delete']
        }))
})
