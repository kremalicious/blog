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
    cdn = 'https://d2jlreog722xe2.cloudfront.net';

// icons
var icons = {
    entypo: {
        src: src + '/_assets/icons/entypo/',
        dist: dist + '/assets/img/',
        prefix: 'entypo-',
        icons: [
            'twitter', 'facebook', 'google+', 'magnifying-glass', 'menu', 'rss', 'link', 'arrow-with-circle-down', 'forward', 'heart', 'info-with-circle', 'infinity', 'github', 'chevron-right', 'chevron-left'
        ]
    }
}

// SVG sprite
spriteConfig = {
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
    ], cb);
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
        .pipe($.stylus({
            use: [nib()],
            'include css': true
        }))
        .pipe($.autoprefixer({
            browsers: 'last 2 versions'
        }))
        .pipe($.combineMq({
            beautify: false
        }))
        // .pipe($.uncss({
        //     html: [dist + '/**/*.html'],
        //     ignore: ['.in', '.collapsing']
        // }))
        .pipe($.cssmin())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dist + '/assets/css/'))
        .pipe($.connect.reload());
});


//
// Scripts
//

// Libraries
gulp.task('js-libraries', function() {
    var picturefill = gulp.src('node_modules/picturefill/dist/picturefill.js');

    return merge(picturefill)
        .pipe($.uglify())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(dist + '/assets/js/'))
});

// Project js
gulp.task('js-project', function() {
    return gulp.src([
            'node_modules/webcomponents.js/CustomElements.js',
            'node_modules/svg4everybody/svg4everybody.js',
            'node_modules/jquery/dist/jquery.js',
            'node_modules/masonry-layout/dist/masonry.pkgd.js',
            'node_modules/imagesloaded/imagesloaded.js',
            'bower_components/simple-jekyll-search/dest/jekyll-search.js',
            'bower_components/time-elements/time-elements.js',
            src + '/_assets/js/*.js'
        ])
        .pipe($.uglify())
        .pipe($.concat('kremalicious3.min.js'))
        .pipe($.header(banner, {
            pkg: pkg
        }))
        .pipe(gulp.dest(dist + '/assets/js/'))
        .pipe($.connect.reload());
});

// Collect all script tasks
gulp.task('js', ['js-libraries', 'js-project']);


//
// Icons
//
gulp.task('icons', function() {
    var iconset = icons.entypo

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
gulp.task('svg-fallbacks', function() {
    return gulp.src(dist + '/assets/img/*.svg')
        .pipe($.svg2png())
        .pipe(gulp.dest(dist + '/assets/img/png/'))
});


//
// Copy images
//
gulp.task('images', function() {
    return gulp.src([src + '/_assets/img/**/*', '!' + src + '/_assets/img/entypo/**/*'])
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
// Gzip all the things
//
gulp.task('optimize:gzip', function() {
  return gulp.src(dist + '/**/*.{html,xml,json,css,js}')
    .pipe($.gzip())
    .pipe(gulp.dest(dist))
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
    .pipe(gulp.dest(dist));
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
        .pipe(gulp.dest(dist));
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
        .pipe(gulp.dest(dist + '/assets/'));
});


//
// Replace all links to assets in files
// from a manifest file
//
gulp.task('revision-replace', function() {

    var manifest = gulp.src(dist + '/assets/rev-manifest.json');

    return gulp.src(dist + '/**/*.{html,xml,txt,json,css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
        .pipe($.revReplace({ manifest: manifest }))
        .pipe(gulp.dest(dist));
});


//
// CDN url injection
//
gulp.task('cdn', function() {
    return gulp.src([dist + '/**/*.html', dist + '/assets/css/*.css'], { base: dist })
        .pipe($.replace('/assets/css/', cdn + '/assets/css/'))
        .pipe($.replace('/assets/js/', cdn + '/assets/js/'))
        //.pipe($.replace('/assets/img/', cdn + '/assets/img/'))
        .pipe($.replace('/media/', cdn + '/media/'))
        .pipe($.replace('https://kremalicious.com' + cdn + '/media/', 'https://kremalicious.com/media/'))
        .pipe($.replace('../', cdn + '/assets/'))
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
    gulp.watch([src + '/_assets/img/**/*.{png,jpg,jpeg,gif}'], ['images']);
    gulp.watch([src + '/_assets/img/**/*.{svg}'], ['icons']);
    gulp.watch([src + '/_media/**/*'], ['media']);
    gulp.watch([src + '/**/*.{html,xml,json,txt}'], ['jekyll-build']);
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
        'svg-fallbacks',
        'revision',
        'revision-replace',
        'cdn',
        'optimize:html',
        'optimize:gzip',
        'optimize:images',
        cb
    );
});
