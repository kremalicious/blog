// load plugins
var $ = require('gulp-load-plugins')();

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require('gulp'),
    del = require('del'),
    chalk = require('chalk'),
    merge = require('merge-stream'),
    pkg = require('./package.json'),
    parallelize = require('concurrent-transform');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

// handle errors
var onError = function(error) {
    console.log(chalk.red('You fucked up:', error.message, 'on line' , error.lineNumber));
}


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Terminal Banner
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

console.log("");
console.log("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
console.log("");
console.log("      (o) Just what do you think you're doing, Matthias?    ");
console.log("");
console.log("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
console.log("");

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// paths
var src = '_src',
    dist = '_site',
    cdn = 'https://cdn.kremalicious.com',
    s3bucket  = 'kremalicious.com',
    s3path    = '/',
    s3region  = 'eu-central-1';

// icons
var icons = {
    entypo: {
        src: src + '/_assets/icons/entypo/',
        dist: dist + '/assets/img/',
        prefix: 'entypo-',
        icons: [
            'twitter', 'facebook', 'google+', 'magnifying-glass', 'menu', 'rss', 'link', 'arrow-with-circle-down', 'forward', 'heart', 'info-with-circle', 'infinity', 'github', 'chevron-right', 'chevron-left', 'eye'
        ]
    }
}

// SVG sprite
var spriteConfig = {
    dest: dist + '/assets/img/',
    mode: {
        symbol: {
            dest: './',
            sprite: 'sprite.svg'
        }
    }
}

// code banner
var banner = [
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
gulp.task('clean', function(cb) {
    return del([
        dist + '/**/*',
        dist + '/.*', // delete all hidden files
        '!' + dist + '/media/**'
    ], cb)
});


//
// Jekyll
//
gulp.task('jekyll', function(cb) {
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build', '--drafts', '--future'], {
        stdio: 'inherit'
    });

    jekyll.on('exit', function(code) {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});

gulp.task('jekyll:production', function(cb) {
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build', '--lsi'], {
        stdio: 'inherit'
    });

    jekyll.on('exit', function(code) {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});


//
// Styles
//
gulp.task('css', function() {
    return gulp.src([
            src + '/_assets/styl/kremalicious3.styl',
            src + '/_assets/styl/poststyle-2300.styl'
        ])
        .pipe($.stylus({ 'include css': true })).on('error', onError)
        .pipe($.autoprefixer({ browsers: 'last 2 versions' })).on('error', onError)
        .pipe($.rename({ suffix: '.min' }))
        .pipe(gulp.dest(dist + '/assets/css/'))
        .pipe($.connect.reload())
});


//
// Scripts
//

// Libraries
gulp.task('js:libraries', function() {
    return gulp.src([
        'node_modules/picturefill/dist/picturefill.js'
    ])
    .pipe($.rename({ suffix: '.min'}))
    .pipe(gulp.dest(dist + '/assets/js/'))
});

// Project js
gulp.task('js:project', function() {
    return gulp.src(src + '/_assets/js/*.js')
        .pipe($.include()).on('error', onError)
        .pipe($.concat('kremalicious3.min.js'))
        .pipe(gulp.dest(dist + '/assets/js/'))
        .pipe($.connect.reload())
});

// Collect all script tasks
gulp.task('js', ['js:libraries', 'js:project'])


//
// Icons
//
gulp.task('icons', function() {
    var iconset = icons.entypo;

    // Iterate through the icon set array
    icons.entypo.icons.forEach(function(icon, i, icons) {
        icons[i] = iconset.src + icon + '.svg';
    });

    return gulp.src(iconset.icons)
        .pipe($.rename({ prefix: iconset.prefix }))
        .pipe(gulp.dest(iconset.dist))
        .pipe($.filter('**/*.svg'))
        .pipe($.imagemin({ svgoPlugins: [{ removeViewBox: false }] }))
        .pipe($.svgSprite(spriteConfig))
        .pipe(gulp.dest(iconset.dist))
});


//
// Generate SVG fallbacks
//
gulp.task('svg:fallbacks', function() {
    return gulp.src(dist + '/assets/img/*.svg')
        .pipe($.svg2png()).on('error', onError)
        .pipe(gulp.dest(dist + '/assets/img/'))
});


//
// Copy images
//
gulp.task('images', function() {
    return gulp.src([
        src + '/_assets/img/**/*',
        '!' + src + '/_assets/img/entypo/**/*'
    ])
    .pipe(gulp.dest(dist + '/assets/img/'))
});


//
// Copy fonts
//
gulp.task('fonts', function() {
    return gulp.src(src + '/_assets/fonts/**/*')
        .pipe(gulp.dest(dist + '/assets/fonts/'))
});


//
// Copy media
//
gulp.task('media', function() {
    return gulp.src(src + '/_media/**/*')
        .pipe(gulp.dest(dist + '/media/'))
});


//
// Optimize css
//
gulp.task('optimize:css', function() {
    return gulp.src(dist + '/assets/css/*.css')
        .pipe($.combineMq({ beautify: false }))
        .pipe($.cssmin())
        .pipe($.header(banner, { pkg: pkg }))
        .pipe(gulp.dest(dist + '/assets/css/'))
});


//
// Optimize js
//
gulp.task('optimize:js', function() {
    return gulp.src(dist + '/assets/js/*.js')
        .pipe($.uglify()).on('error', onError)
        .pipe($.header(banner, { pkg: pkg }))
        .pipe(gulp.dest(dist + '/assets/js/'))
});


//
// Optimize HTML
//
gulp.task('optimize:html', function() {
  return gulp.src(dist + '/**/*.html')
    .pipe($.htmlmin({
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeComments: true,
        useShortDoctype: true,
        collapseBooleanAttributes: true,
        removeRedundantAttributes: true,
        removeEmptyAttributes: true,
        removeEmptyAttributes: true
    }))
    .pipe(gulp.dest(dist))
});


//
// Optimize images
//
gulp.task('optimize:images', function() {
    return gulp.src([
            dist + '/**/*.{png,jpg,jpeg,gif,svg,webp}',
            '!' + dist + '/media/**/*',
            '!' + dist + '/assets/img/sprite*'
        ])
        .pipe($.cache($.imagemin({
            optimizationLevel: 5, // png
            progressive: true, // jpg
            interlaced: true, // gif
            multipass: true, // svg
            svgoPlugins: [{ removeViewBox: false }]
        })))
        .pipe(gulp.dest(dist))
});


//
// Revision static assets
//
gulp.task('revision', function() {
    return gulp.src(dist + '/assets/**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
        .pipe($.rev())
        .pipe(gulp.dest(dist + '/assets/'))
        // output rev manifest for next replace task
        .pipe($.rev.manifest())
        .pipe(gulp.dest(dist + '/assets/'))
});


//
// Replace all links to assets in files
// from a manifest file
//
gulp.task('revision:replace', function() {

    var manifest = gulp.src(dist + '/assets/rev-manifest.json');

    return gulp.src(dist + '/**/*.{html,xml,txt,json,css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
        .pipe($.revReplace({ manifest: manifest }))
        .pipe(gulp.dest(dist))
});


//
// CDN url injection
//
gulp.task('cdn', function() {
    return gulp.src([
            dist + '/**/*.html',
            dist + '/assets/css/*.css'
        ], { base: dist })
        .pipe($.replace('/assets/css/', cdn + '/assets/css/'))
        .pipe($.replace('/assets/js/', cdn + '/assets/js/'))
        //.pipe($.replace('/assets/img/', cdn + '/assets/img/'))
        .pipe($.replace('/media/', cdn + '/media/'))
        .pipe($.replace('https://kremalicious.com' + cdn + '/media/', 'https://kremalicious.com/media/'))
        .pipe($.replace('../', cdn + '/assets/'))
        .pipe(gulp.dest(dist))
});


//
// Assets uploading to S3
//
gulp.task('s3:assets', function() {
    var publisher = $.awspublish.create({
        params: {
            'Bucket': s3bucket
        },
        'accessKeyId': process.env.AWS_ACCESS_KEY_ID,
        'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY,
        'region': s3region
    });

    // define custom headers
    var headers = {
        'Cache-Control': 'max-age=315360000, no-transform, public',
        'x-amz-acl': 'public-read'
    };

    var assets = gulp.src(dist + '/assets/**/*', { base: dist + '/' }),
        media  = gulp.src(dist + '/media/**/*', { base: dist + '/' });

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
gulp.task('connect', function() {
    return $.connect.server({
        root: [dist],
        livereload: true,
        port: 1337
    })
});

//
// Watch task
//
gulp.task('watch', function() {
    gulp.watch([src + '/_assets/styl/**/*.styl'], ['css'])
    gulp.watch([src + '/_assets/js/*.js'], ['js:project'])
    gulp.watch([src + '/_assets/img/**/*.{png,jpg,jpeg,gif}'], ['images'])
    gulp.watch([src + '/_assets/img/**/*.{svg}'], ['icons'])
    gulp.watch([src + '/_media/**/*'], ['media'])
    gulp.watch([src + '/**/*.{html,xml,json,txt,md}'], ['jekyll-build'])
});

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

gulp.task('jekyll-build', function(cb) {
    runSequence(
        'jekyll',
        ['css', 'js', 'images', 'fonts', 'media'],
        'icons',
        cb
    );
});

//
// Dev Server
//
gulp.task('default', function(cb) {
    runSequence(
        'clean',
        'jekyll-build',
        'watch',
        'connect',
        cb
    );
});

//
// Production build
//
gulp.task('build', function(cb) {
    runSequence(
        'clean',
        'jekyll:production',
        ['css', 'js', 'images', 'fonts', 'media'],
        'icons',
        'svg:fallbacks',
        'revision',
        'revision:replace',
        'cdn',
        ['optimize:html', 'optimize:images', 'optimize:css', 'optimize:js'],
        's3:assets',
        cb
    );
});
