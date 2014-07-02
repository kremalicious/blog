module.exports = function(grunt){
    'use strict';

    // config
    var gruntConfig = {
        src: '_src',
        site: '_site',
        build: '_build',
        assets: {
            less:   'assets/less',
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
                    //lsi: true
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

        // less
        less: {
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/kremalicious3.min.css' : '<%= config.src %>/<%= config.assets.less %>/kremalicious3.less',
                    '<%= config.site %>/<%= config.assets.css %>/poststyle-2300.min.css' : '<%= config.src %>/<%= config.assets.less %>/poststyle-2300.less'
                },
            },
        },

        // combine css media queries
        cmq: {
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/': ['<%= config.site %>/<%= config.assets.css %>/kremalicious3.min.css']
                }
            }
        },

        // minify css
        cssmin: {
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/kremalicious3.min.css': ['<%= config.site %>/<%= config.assets.css %>/*.css'],
                    '<%= config.site %>/<%= config.assets.css %>/poststyle-2300.min.css': ['<%= config.site %>/<%= config.assets.css %>/poststyle-2300.min.css']
                }
            }
        },

        // Concatenate and minify js
        uglify: {
            options: {
                report: 'min'
            },
            jquery: {
                files: {
                    '<%= config.site %>/<%= config.assets.js %>/jquery.min.js': 'bower_components/jquery/dist/jquery.js'
                }
            },
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.js %>/picturefill.min.js': [
                        'bower_components/picturefill/dist/picturefill.js'
                    ],
                    '<%= config.site %>/<%= config.assets.js %>/kremalicious3.min.js': [
                        'bower_components/infinitescroll/index.js',
                        'bower_components/masonry/index.js',
                        'bower_components/imagesloaded/imagesloaded.js',
                        'bower_components/simpleJekyllSearch/index.js',
                        'bower_components/socialite/index.js',
                        'bower_components/jquery.adaptive-background/index.js',
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
            less: {
                files: ['<%= config.src %>/<%= config.assets.less %>/*.less'],
                tasks: ['less','cmq','cssmin']
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
                tasks: ['jekyll:development', 'less', 'cmq', 'cssmin', 'uglify']
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
        'less',
        'cmq',
        'cssmin',
        'uglify',
        'connect',
        'watch'
    ]);

    // Full Dev server
    grunt.registerTask('server', [
        'clean:site',
        'jekyll:development',
        'rsync:copy_media',
        'less',
        'cmq',
        'cssmin',
        'uglify',
        'connect',
        'watch'
    ]);

    // Production build
    grunt.registerTask('build', [
        'clean',
        'jekyll:production',
        'rsync:copy_media',
        'less',
        'cmq',
        'cssmin',
        'uglify',
        'imagemin:assets',
        'imagemin:touchicons',
        'rsync:copy_build',
        'rev',
        'usemin'
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