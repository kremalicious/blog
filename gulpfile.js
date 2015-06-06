
// load plugins
var $ = require('gulp-load-plugins')();

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require('gulp'),
    del = require('del'),
    nib = require('nib'),
    merge = require('merge-stream'),
    pkg = require('./package.json');

// Temporary solution until gulp 4
// https://github.com/gulpjs/gulp/issues/355
var runSequence = require('run-sequence');

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Config
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

var src = '_src',
    dist = '_site';

var banner = [
    '/**',
    ' ** <%= pkg.name %> - <%= pkg.description %>',
    ' ** <%= pkg.repository.url %>',
    ' ** @author <%= pkg.author %>',
    ' ** @version v<%= pkg.version %>',
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
        '!' + dist + '/media/**'
    ], cb);
});


//
// Jekyll
//
gulp.task('jekyll', function (cb){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
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
        .pipe($.stylus({ use: [nib()], 'include css': true }))
        .pipe($.autoprefixer({ browsers: 'last 2 versions' }))
        .pipe($.combineMq({ beautify: false }))
        // .pipe($.uncss({
        //     html: [dist + '/**/*.html'],
        //     ignore: ['.in', '.collapsing']
        // }))
        .pipe($.cssmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe($.header(banner, {pkg: pkg}))
        .pipe(gulp.dest(dist + '/assets/css/'))
        .pipe($.connect.reload());
});


//
// Scripts
//

// Libraries
gulp.task('js-libraries', function() {
    var jquery = gulp.src('node_modules/jquery/dist/jquery.js'),
        picturefill = gulp.src('node_modules/picturefill/dist/picturefill.js'),
        CustomElements = gulp.src('node_modules/webcomponents.js/CustomElements.js')

    return merge(jquery, picturefill, CustomElements)
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(dist + '/assets/js/'))
});

// Project js
gulp.task('js-project', function() {
    return gulp.src([
        'node_modules/masonry-layout/dist/masonry.pkgd.js',
        'node_modules/imagesloaded/imagesloaded.js',
        'bower_components/simple-jekyll-search/dest/jekyll-search.js',
        'bower_components/time-elements/time-elements.js',
        src + '/_assets/js/*.js'
    ])
    .pipe($.uglify())
    .pipe($.concat('kremalicious3.min.js'))
    .pipe($.header(banner, {pkg: pkg}))
    .pipe(gulp.dest(dist + '/assets/js/'))
    .pipe($.connect.reload());
});

// Collect all script tasks
gulp.task('js', ['js-libraries', 'js-project']);


//
// Copy images
//
gulp.task('images', function() {
  return gulp.src(src + '/_assets/img/**/*')
      .pipe(gulp.dest(dist + '/assets/img/'))
      .pipe($.connect.reload());
});


//
// Copy fonts
//
gulp.task('fonts', function() {
  return gulp.src(src + '/_assets/fonts/**/*')
      .pipe(gulp.dest(dist + '/assets/fonts/'))
      .pipe($.connect.reload());
});


//
// Copy media
//
gulp.task('media', function() {
  return gulp.src(src + '/_media/**/*')
      .pipe(gulp.dest(dist + '/media/'))
      .pipe($.connect.reload());
});


//
// Image optimization
//
gulp.task('imagemin', function () {
    return gulp.src(dist + '/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe($.imagemin({
            optimizationLevel: 5, // png
            progressive: true,    // jpg
            interlaced: true,     // gif
            multipass: true,      // svg
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest(dist));
});


//
// Revision static assets
//
gulp.task('revision', function () {
    return gulp.src(dist + '/assets/**/*.{css,js}')
        .pipe($.rev())
        .pipe(gulp.dest(dist + '/assets/'))
        // output rev manifest for next replace task
        .pipe($.rev.manifest())
        .pipe(gulp.dest(dist + '/assets/'));
});

//
// Replace all links to assets in files
// from a manifest file
//
gulp.task('revision-replace', function() {

    var manifest = gulp.src(dist + '/assets/rev-manifest.json');

    return gulp.src(dist + '/**/*.{html,xml,txt,json,css,js}')
        .pipe($.revReplace({manifest: manifest}))
        .pipe(gulp.dest(dist));
});

//
// Dev Server
//
gulp.task('connect', function() {
    return $.connect.server({
        root: [dist],
        livereload: true,
        port: 1337
    });
});

//
// Watch task
//
gulp.task('watch', function() {
    gulp.watch([src + '/_assets/styl/**/*.styl'], ['css']);
    gulp.watch([src + '/_assets/js/*.js'], ['js-project']);
    gulp.watch([src + '/_assets/img/**/*'], ['images']);
    gulp.watch([src + '/**/*.{html,xml,json,txt}'], ['jekyll']);
});

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//
// Dev Server
//
gulp.task('server', function(cb) {
    runSequence(
        'clean',
        'jekyll',
        ['css', 'js', 'images', 'fonts', 'media'],
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
        'jekyll',
        ['css', 'js', 'images', 'fonts', 'media'],
        'revision',
        'revision-replace',
        'imagemin',
        cb
    );
});
