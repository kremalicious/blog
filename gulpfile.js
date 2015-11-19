// load plugins
var $ = require('gulp-load-plugins')();

// manually require modules that won"t get picked up by gulp-load-plugins
var gulp = require('gulp'),
    del = require('del'),
    chalk = require('chalk'),
    merge = require('merge-stream'),
    pkg = require('./package.json'),
    parallelize = require('concurrent-transform'),
    combineMq = require('gulp-combine-mq');

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

// paths
var src       = '_src',
    dist      = '_site',
    cdn       = 'https://cdn.kremalicious.com',
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

    if (isProduction) {
        var jekyll = spawn('bundle', ['exec', 'jekyll', 'build', '--lsi'], { stdio: 'inherit' });
    } else {
        var jekyll = spawn('bundle', ['exec', 'jekyll', 'build', '--drafts', '--future', '--incremental'], { stdio: 'inherit' });
    }

    jekyll.on('exit', function(code) {
        cb(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
    });
});


//
// HTML
//
gulp.task('html', function() {
    return gulp.src(dist + '/**/*.html')
        .pipe($.if(isProduction, $.htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
            removeComments: true,
            useShortDoctype: true,
            collapseBooleanAttributes: true,
            removeRedundantAttributes: true,
            removeEmptyAttributes: true
        })))
        .pipe(gulp.dest(dist))
});


//
// Styles
//
gulp.task('css', function() {
    return gulp.src([
            src + '/_assets/styl/kremalicious3.styl',
            src + '/_assets/styl/post-*.styl'
        ])
        .pipe($.stylus({ 'include css': true })).on('error', onError)
        .pipe($.autoprefixer({ browsers: 'last 2 versions' }))
        .pipe($.if(isProduction, combineMq({ beautify: false }))).on('error', onError)
        .pipe($.if(isProduction, $.cssmin()))
        .pipe($.if(isProduction, $.header(banner, { pkg: pkg })))
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
        .pipe($.if(isProduction, $.uglify())).on('error', onError)
        .pipe($.rename({ suffix: '.min'}))
        .pipe(gulp.dest(dist + '/assets/js/'))
});

// Project js
gulp.task('js:project', function() {
    return gulp.src(src + '/_assets/js/app.js')
        .pipe($.include()).on('error', onError)
        .pipe($.concat('kremalicious3.min.js'))
        .pipe($.if(isProduction, $.uglify())).on('error', onError)
        .pipe($.if(isProduction, $.header(banner, { pkg: pkg })))
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
        .pipe($.if(isProduction, $.imagemin({ svgoPlugins: [{ removeViewBox: false }] })))
        .pipe($.svgSprite(spriteConfig))
        .pipe(gulp.dest(iconset.dist))
});


//
// Copy images
//
gulp.task('images', function() {
    return gulp.src([
        src + '/_assets/img/**/*',
        '!' + src + '/_assets/img/entypo/**/*'
    ])
    .pipe($.if(isProduction, $.imagemin({
        optimizationLevel: 5, // png
        progressive: true, // jpg
        interlaced: true, // gif
        multipass: true, // svg
        svgoPlugins: [{ removeViewBox: false }]
    })))
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
// Revision static assets
//
gulp.task('rev', function() {
    return gulp.src(dist + '/assets/**/*.{css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
        .pipe($.if(isProduction, $.rev()))
        .pipe(gulp.dest(dist + '/assets/'))
        // output rev manifest for next replace task
        .pipe($.if(isProduction, $.rev.manifest()))
        .pipe(gulp.dest(dist + '/assets/'))
});


//
// Replace all links to assets in files
// from a manifest file
//
gulp.task('rev:replace', function() {

    var manifest = gulp.src(dist + '/assets/rev-manifest.json');

    return gulp.src(dist + '/**/*.{html,xml,txt,json,css,js,png,jpg,jpeg,svg,eot,ttf,woff}')
        .pipe($.if(isProduction, $.revReplace({ manifest: manifest })))
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
    gulp.watch([src + '/_assets/js/*.js'], ['js'])
    gulp.watch([src + '/_assets/img/**/*.{png,jpg,jpeg,gif}'], ['images'])
    gulp.watch([src + '/_assets/img/**/*.{svg}'], ['icons'])
    gulp.watch([src + '/_media/**/*'], ['media'])
    gulp.watch([src + '/**/*.{html,xml,json,txt,md}'], ['build'])
});

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Task sequences
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


//
// Dev Server
//
gulp.task('default', function(cb) {
    runSequence(
        'build',
        ['watch', 'connect'],
        cb
    );
});


//
// Full build
//
gulp.task('build', function(cb) {

    console.log(chalk.gray("         ------------------------------------------"));
    console.log(chalk.green('                Building ' + ($.util.env.production ? 'production' : 'dev') + ' version...'));
    console.log(chalk.gray("         ------------------------------------------"));

    runSequence(
        'clean',
        'jekyll',
        //'html',
        ['css', 'js', 'images', 'icons', 'fonts', 'media'],
        'rev',
        'rev:replace',
        cb
    );
});
