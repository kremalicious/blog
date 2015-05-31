module.exports = function(grunt){
    'use strict';

    // config
    var gruntConfig = {
        src: '_src',
        site: '_site',
        build: '_build',
        cdnurl: 'https://d2jlreog722xe2.cloudfront.net',
        assets: {
            stylus: 'assets/styl',
            css:    'assets/css',
            js:     'assets/js',
            img:    'assets/img',
            fonts:  'assets/fonts'
        }
    };

    // banner
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");
    grunt.log.writeln("      (o) Just what do you think you're doing, Matthias?    ");
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");

    // Grunt config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: gruntConfig,

        // clean everything
        clean: {
            site: [
                '<%= config.site %>/*',
                '<%= config.site %>/.htaccess',
                '!<%= config.site %>/media'
            ],
            build: [
                '<%= config.build %>/*',
                '<%= config.build %>/.htaccess'
            ]
        },

        // Jekyll
        jekyll: {
            options: {
                src : '<%= config.src %>/',
                config: './_config.yml'
            },
            production: {
                options: {
                    lsi: true
                }
            },
            development: {
                options: {
                    drafts: true,
                    future: true,
                    //limit_posts: 5
                }
            }
        },

        // Stylus
        stylus: {
            compile: {
                options: {
                    'include css': true,
                    compress: false
                },
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/kremalicious3.min.css' : '<%= config.src %>/<%= config.assets.stylus %>/kremalicious3.styl',
                    '<%= config.site %>/<%= config.assets.css %>/poststyle-2300.min.css' : '<%= config.src %>/<%= config.assets.stylus %>/poststyle-2300.styl'
                }
            }
        },

        // Post process css
        postcss: {
            options: {
                processors: [
                    // autoprefixer
                    require('autoprefixer-core')({browsers: 'last 2 versions'}),
                    // combine media queries
                    require('css-mqpacker'),
                    // css minification
                    require('csswring')
                ]
            },
            dist: {
                src: '<%= config.site %>/<%= config.assets.css %>/*.css'
            }
        },

        // Concatenate and minify js
        uglify: {
            options: {
                report: 'min'
            },
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.js %>/picturefill.min.js': [
                        'node_modules/picturefill/dist/picturefill.js'
                    ],
                    '<%= config.site %>/<%= config.assets.js %>/CustomElements.min.js': [
                        'bower_components/webcomponentsjs/CustomElements.js'
                    ],
                    '<%= config.site %>/<%= config.assets.js %>/kremalicious3.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'bower_components/jquery-infinite-scroll/jquery.infinitescroll.js',
                        'node_modules/masonry-layout/dist/masonry.pkgd.js',
                        'node_modules/imagesloaded/imagesloaded.js',
                        'bower_components/simple-jekyll-search/dest/jekyll-search.js',
                        'bower_components/time-elements/time-elements.js',
                        '<%= config.src %>/<%= config.assets.js %>/app.js'
                    ]
                }
            }
        },

        // image optimization
        imagemin: {
            assets: {
                files: [{
                    expand: true,
                    cwd: '<%= config.site %>/<%= config.assets.img %>/',
                    src: ['**/*.{png,jpg,jpeg,gif}'],
                    dest: '<%= config.site %>/<%= config.assets.img %>/'
                }]
            },
            media: {
                files: [{
                    expand: true,
                    cwd: '<%= config.site %>/media/',
                    src: ['**/*.{png,gif}'],
                    dest: '<%= config.site %>/media/'
                }]
            },
            touchicons: {
                files: [{
                    expand: true,
                    cwd: '<%= config.site %>/',
                    src: ['*.png'],
                    dest: '<%= config.site %>/'
                }]
            }
        },

        // dev server
        connect: {
            server: {
                options: {
                    port: 1337,
                    hostname: '*',
                    base: '<%= config.site %>'
                }
            }
        },

        // watch
        watch: {
            options: {
                livereload: true
            },
            stylus: {
                files: ['<%= config.src %>/<%= config.assets.stylus %>/*.styl'],
                tasks: ['stylus', 'postcss']
            },
            js: {
                files: ['<%= config.src %>/<%= config.assets.js %>/*.js'],
                tasks: ['uglify']
            },
            jekyll: {
                files: [
                    '<%= config.src %>/**/*.html',
                    '<%= config.src %>/*.xml',
                    '<%= config.src %>/*.json',
                    '<%= config.src %>/.htaccess',
                    '<%= config.src %>/_includes/**',
                    '<%= config.src %>/_layouts/**',
                    '<%= config.src %>/_posts/**',
                    '<%= config.src %>/_drafts/**'
                ],
                tasks: ['jekyll:development', 'stylus', 'postcss', 'uglify']
            },
        },

        // assets versioning
        rev: {
            files: {
                src: [
                    '<%= config.build %>/assets/{css,js,img,fonts}/*.*'
                ]
            }
        },

        // updating assets paths in html/css
        usemin: {
            html: ['<%= config.build %>/**/*.html'],
            css: ['<%= config.build %>/**/*.css'],
            options: {
                dirs: '<%= config.build %>',
                basedir: '<%= config.build %>',
                assetsDirs: ['<%= config.build %>', '<%= config.build %>/assets/{css,js,img,fonts}']
            }
        },

        // insert CDN url by replacing text strings
        replace: {
            html: {
                src: ['<%= config.build %>/**/*.html'],
                overwrite: true,
                replacements: [
                    {
                        from: '/assets/js/',
                        to: '<%= config.cdnurl %>/assets/js/'
                    },
                    {
                        from: '/assets/img/',
                        to: '<%= config.cdnurl %>/assets/img/'
                    },
                    {
                        from: '/media/',
                        to: '<%= config.cdnurl %>/media/'
                    },
                    {
                        from: 'https://kremalicious.com<%= config.cdnurl %>/media/',
                        to: 'https://kremalicious.com/media/'
                    }
                ]
            },
            css: {
                src: ['<%= config.build %>/<%= config.assets.css %>/*.css'],
                overwrite: true,
                replacements: [
                    {
                        from: '../',
                        to: '<%= config.cdnurl %>/assets/'
                    }
                ]
            }
        },

        // rsync stuff around
        rsync: {
            options: {
                recursive: true
            },
            // copy media folder
            copy_media: {
                options: {
                    src: '<%= config.src %>/_media/',
                    dest: '<%= config.site %>/media',
                    exclude: ['**/gen'],
                    syncDestIgnoreExcl: true,
                    args: ['--update']
                }
            },
            // copy build
            copy_build: {
                options: {
                    src: '<%= config.site %>/',
                    dest: '<%= config.build %>',
                    syncDest: true
                }
            },
            // deployment
            deploy: {
                options: {
                    syncDest: true,
                    src: '<%= config.build %>/',
                    dest: 'domains/kremalicious.com/html',
                    host: 'kremalicious',
                    ssh: true,
                    compareMode: 'checksum',
                    args: ['--verbose']
                }
            }
        }

    });

    // Load NPM Tasks, smart code stolen from @bluemaex <https://github.com/bluemaex>
    require('fs').readdirSync('node_modules').filter(function (file) {
        return file && file.indexOf('grunt-') > -1;
    }).forEach(function (file) {
        grunt.loadNpmTasks(file);
    });

    // Default Task, assets only
    grunt.registerTask('default', [
        'stylus',
        'postcss',
        'uglify',
        'connect',
        'watch'
    ]);

    // Full Dev server
    grunt.registerTask('server', [
        'clean:site',
        'jekyll:development',
        'rsync:copy_media',
        'stylus',
        'postcss',
        'uglify',
        'connect',
        'watch'
    ]);

    // Production build
    grunt.registerTask('build', [
        'clean',
        'jekyll:production',
        'rsync:copy_media',
        'stylus',
        'postcss',
        'uglify',
        'imagemin:assets',
        'imagemin:touchicons',
        'rsync:copy_build',
        'rev',
        'usemin',
        'replace'
    ]);

    // Optimze media
    grunt.registerTask('mediamin', [
        'imagemin:media'
    ]);

    // Deploy
    grunt.registerTask('deploy', [
        'rsync:deploy'
    ]);

};
