// load plugins
var $ = require('gulp-load-plugins')();

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require('gulp'),
    del = require('del'),
    chalk = require('chalk'),
    merge = require('merge-stream'),
    pkg = require('./package.json'),
    parallelize = require('concurrent-transform'),
    browser = require('browser-sync');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

// handle errors
var onError = function(error) {
    console.log(chalk.red('You fucked up:', error.message, 'on line' , error.lineNumber));
    this.emit('end');
}

// 'development' is just default, production overrides are triggered
// by adding the production flag to the gulp command e.g. `gulp build --production`
var isProduction = ($.util.env.production === true ? true : false);

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Terminal Banner
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log("");
console.log(chalk.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"));
console.log("");
console.log(chalk.cyan("      (o) Just what do you think you're doing,", process.env.USER, "?    "));
console.log("");
console.log(chalk.gray("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>"));
console.log("");

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// Port to use for the development server.
var PORT = 1337;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// paths
var SRC       = '_src',
    DIST      = '_site',
    CDN       = 'https://cdn.kremalicious.com',
    S3BUCKET  = 'kremalicious.com',
    S3PATH    = '/',
    S3REGION  = 'eu-central-1';

// icons
var ICONS = {
    entypo: {
        src: SRC + '/_assets/icons/entypo/',
        dist: DIST + '/assets/img/',
        prefix: 'entypo-',
        icons: [
            'twitter', 'facebook', 'google+', 'magnifying-glass', 'menu', 'rss', 'link', 'arrow-with-circle-down', 'forward', 'heart', 'info-with-circle', 'infinity', 'github', 'chevron-right', 'chevron-left', 'eye'
        ]
    }
}

var iconset = ICONS.entypo;

// Iterate through the icon set array
iconset.icons.forEach(function(icon, i, icons) {
    icons[i] = iconset.src + icon + '.svg';
});

// SVG sprite
var SPRITE = {
    dest: DIST + '/assets/img/',
    mode: {
        symbol: {
            dest: './',
            sprite: 'sprite.svg'
        }
    }
}

// code banner
var BANNER = [
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
].join('\n');


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Tasks
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Delete build artifacts
//
gulp.task('clean', function(done) {
    return del([
        DIST + '/**/*',
        DIST + '/.*', // delete all hidden files
        '!' + DIST + '/media/**'
    ], done)
});


//
// Jekyll
//
gulp.task('jekyll', function(cb) {
    browser.notify('Compiling Jekyll');

    var spawn = require('child_process').spawn;

    if (isProduction) {
        process.env.JEKYLL_ENV = 'production';
        var jekyll = spawn('bundle', ['exec', 'jekyll', 'build', '--lsi'], { stdio: 'inherit' });
    } else {
        var jekyll = spawn('bundle', ['exec', 'jekyll', 'build', '--config', '_config.yml,_config.dev.yml', '--drafts', '--future', '--incremental'], { stdio: 'inherit' });
    }

    jekyll.on('exit', function(code) {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});


//
// HTML
//
gulp.task('html', function() {
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
});


//
// Styles
//
gulp.task('css', function() {
    return gulp.src([
            SRC + '/_assets/styl/kremalicious3.styl',
            SRC + '/_assets/styl/post-*.styl'
        ])
        .pipe($.sourcemaps.init())
        .pipe($.stylus({ 'include css': true })).on('error', onError)
        .pipe($.autoprefixer({ browsers: COMPATIBILITY }))
        .pipe($.if(isProduction, $.cssmin()))
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(DIST + '/assets/css/'))
});


//
// Scripts
//

// Libraries
gulp.task('js:libraries', function() {
    return gulp.src([
            'node_modules/picturefill/DIST/picturefill.js'
        ])
        .pipe($.if(isProduction, $.uglify())).on('error', onError)
        .pipe($.rename({ suffix: '.min'}))
        .pipe(gulp.dest(DIST + '/assets/js/'))
});

// Project js
gulp.task('js:project', function() {
    return gulp.src(SRC + '/_assets/js/app.js')
        .pipe($.include()).on('error', onError)
        .pipe($.sourcemaps.init())
        .pipe($.concat('kremalicious3.min.js'))
        .pipe($.if(isProduction, $.uglify())).on('error', onError)
        .pipe($.if(!isProduction, $.sourcemaps.write()))
        .pipe($.if(isProduction, $.header(BANNER, { pkg: pkg })))
        .pipe(gulp.dest(DIST + '/assets/js/'))
});

// Collect all script tasks
gulp.task('js', ['js:libraries', 'js:project'])


//
// Icons
//
gulp.task('icons', function() {
    return gulp.src(iconset.icons)
        .pipe($.rename({ prefix: iconset.prefix }))
        .pipe(gulp.dest(iconset.dist))
        .pipe($.filter('**/*.svg'))
        .pipe($.if(isProduction, $.imagemin({ svgoPlugins: [{ removeViewBox: false }] })))
        .pipe($.svgSprite(SPRITE))
        .pipe(gulp.dest(iconset.dist))
});


//
// Copy images
//
gulp.task('images', function() {
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
});


//
// Copy fonts
//
gulp.task('fonts', function() {
    return gulp.src(SRC + '/_assets/fonts/**/*')
        .pipe(gulp.dest(DIST + '/assets/fonts/'))
});


//
// Copy media
//
gulp.task('media', function() {
    return gulp.src(SRC + '/_media/**/*')
        .pipe(gulp.dest(DIST + '/media/'))
});


//
// Revision static assets
//
gulp.task('rev', function() {
    // globbing is slow so do everything conditionally for faster dev build
    if (isProduction) {
        return gulp.src(DIST + '/assets/**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
            .pipe($.if(isProduction, $.rev()))
            .pipe(gulp.dest(DIST + '/assets/'))
            // output rev manifest for next replace task
            .pipe($.if(isProduction, $.rev.manifest()))
            .pipe(gulp.dest(DIST + '/assets/'))
    }
});


//
// Replace all links to assets in files
// from a manifest file
//
gulp.task('rev:replace', function() {
    // globbing is slow so do everything conditionally for faster dev build
    if (isProduction) {
        var manifest = gulp.src(DIST + '/assets/rev-manifest.json');
        return gulp.src(DIST + '/**/*.{html,xml,txt,json,css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
            .pipe($.if(isProduction, $.revReplace({ manifest: manifest })))
            .pipe(gulp.dest(DIST))
    }
});


//
// CDN url injection
//
gulp.task('cdn', function() {
    return gulp.src([
            DIST + '/**/*.html',
            DIST + '/assets/css/*.css'
        ], { base: DIST })
        .pipe($.replace('/assets/css/', CDN + '/assets/css/'))
        .pipe($.replace('/assets/js/', CDN + '/assets/js/'))
        //.pipe($.replace('/assets/img/', CDN + '/assets/img/'))
        .pipe($.replace('/media/', CDN + '/media/'))
        .pipe($.replace('https://kremalicious.com/media/', CDN + '/media/'))
        .pipe($.replace('https://kremalicious.com' + CDN + '/media/', CDN + '/media/'))
        .pipe($.replace('../', CDN + '/assets/'))
        .pipe(gulp.dest(DIST))
});


//
// Assets uploading to S3
//
gulp.task('s3:assets', function() {
    var publisher = $.awspublish.create({
        params: {
            'Bucket': S3BUCKET
        },
        'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
        'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
        'region': S3REGION
    });

    // define custom headers
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public',
        'x-amz-acl': 'public-read'
    };

    var assets = gulp.src(DIST + '/assets/**/*', { base: DIST + '/' }),
        media  = gulp.src(DIST + '/media/**/*', { base: DIST + '/' });

    return merge(assets, media)
        .pipe($.rename(function (path) {
            // This is weird, but is needed to make the file use the relative path...
        }))
        .pipe($.awspublish.gzip({ ext: '' })) // gzip all the things
        .pipe(parallelize(publisher.publish(headers), 10))
        //.pipe(publisher.sync()) // delete files in bucket that are not in local folder
        .pipe($.awspublish.reporter({
            states: ['create', 'update', 'delete']
        }));
});


//
// Dev Server
//
gulp.task('server', ['build'], function() {
    browser.init({
        server: DIST,
        port: PORT
    });
});


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//
// Build site, run server, and watch for file changes
//
gulp.task('default', ['build', 'server'], function() {
    gulp.watch([SRC + '/_assets/styl/**/*.styl'], ['css', browser.reload]);
    gulp.watch([SRC + '/_assets/js/*.js'], ['js', browser.reload]);
    gulp.watch([SRC + '/_assets/img/**/*.{png,jpg,jpeg,gif}'], ['images', browser.reload]);
    gulp.watch([SRC + '/_assets/img/**/*.{svg}'], ['icons', browser.reload]);
    gulp.watch([SRC + '/_media/**/*'], ['media', browser.reload]);
    gulp.watch([SRC + '/**/*.{html,xml,json,txt,md}', './*.yml'], ['build', browser.reload]);
});


//
// Full build
//
gulp.task('build', function(done) {

    console.log(chalk.gray("         ------------------------------------------"));
    console.log(chalk.green('                Building ' + ($.util.env.production ? 'production' : 'dev') + ' version...'));
    console.log(chalk.gray("         ------------------------------------------"));

    runSequence(
        'clean',
        'jekyll',
        ['html', 'css', 'js', 'images', 'icons', 'fonts', 'media'],
        'rev',
        'rev:replace',
        done
    );
});
