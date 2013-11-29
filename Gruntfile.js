module.exports = function(grunt){
    'use strict';
    
    // config
    var gruntConfig = {
        src: '_src',
        site: '_site',
        assets: {
            less:   'assets/less',
            css:    'assets/css',
            js:     'assets/js',
            img:    'assets/img'
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
            build: [
                '<%= config.site %>/*', 
                '!<%= config.site %>/media'
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
                    limit_posts: 50
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
                    '<%= config.site %>/<%= config.assets.js %>/jquery.min.js': 'bower_components/jquery/jquery.js'
                }
            },
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.js %>/picturefill.min.js': [
                        'bower_components/picturefill/picturefill.js'
                    ],
                    '<%= config.site %>/<%= config.assets.js %>/kremalicious3.min.js': [
                        'bower_components/infinitescroll/index.js',
                        //'bower_components/masonry/masonry.js',
                        //'bower_components/imagesloaded/imagesloaded.js',
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
                    base: '_site'
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
                tasks: ['less']
            },
            js: {
                files: ['<%= config.src %>/<%= config.assets.js %>/*.js'],
                tasks: ['uglify']
            },
            jekyll: {
                files: [
                    '<%= config.src %>/*.html', 
                    '<%= config.src %>/*.xml', 
                    '<%= config.src %>/_includes/**', 
                    '<%= config.src %>/_layouts/**',
                    '<%= config.src %>/_posts/**',
                    '<%= config.src %>/_drafts/**'
                ],
                tasks: ['jekyll:development', 'less', 'uglify']
            },
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
                    syncDestIgnoreExcl: true
                }
            },
            // deployment
            deploy: {
                options: {
                    syncDest: true,
                    src: '<%= config.site %>/',
                    dest: 'domains/kremalicious.com/html',
                    host: 'kremalicious',
                    ssh: true,
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
    
    // Default Task
    grunt.registerTask('default', [
        'less',
        'cmq',
        'cssmin',
        'uglify',
        'connect',
        'watch'
    ]);
    
    // Dev server
    grunt.registerTask('server', [
        'rsync:copy_media',
        'jekyll:development',
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
        'rsync:copy_media',
        'jekyll:production',
        'imagemin:assets',
        'imagemin:touchicons',
        'less',
        'cmq',
        'cssmin',
        'uglify'
    ]);
    
    // Deploy
    grunt.registerTask('deploy', [
        'rsync:deploy'
    ]);

};