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
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");
    grunt.log.writeln("       Just what do you think you're doing, Matthias?    ");
    grunt.log.writeln("");
    grunt.log.writeln("   <<<<<<<<<<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>");
    grunt.log.writeln("");
    
    // Grunt config
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        config: gruntConfig,
        
        // clean everything
        clean: {
            build: ['<%= config.site %>']
        },

        // Jekyll
        jekyll: {
            production : {
                options: {
                    lsi: true
                }
			},
            serve: {
                
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
            production: {
                options: {
                    report: 'min',
                    mangle: true
                },
                files: {
                    '<%= config.site %>/<%= config.assets.js %>/kremalicious3.min.js': [
                        '<%= config.src %>/<%= config.assets.js %>/picturefill.js',
                        '<%= config.src %>/<%= config.assets.js %>/app.js'
                    ]
                }
            }
        },
        
        // image optimization
        imagemin: {
            assets: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.site %>/<%= config.assets.img %>/',
                        src: ['**/*.{png,jpg,jpeg,gif}'],
                        dest: '<%= config.site %>/<%= config.assets.img %>/'
                    }
                ]
            },
            media: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.site %>/media/',
                        src: ['**/*.{png,jpg,jpeg,gif}'],
                        dest: '<%= config.site %>/media/'
                    }
                ]
            },
            touchicons: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.site %>/',
                        src: ['*.png'],
                        dest: '<%= config.site %>/',
                        ext: '.png'
                    }
                ]
            },
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
                    '<%= config.src %>/_includes/**', 
                    '<%= config.src %>/_layouts/**',
                    '<%= config.src %>/_posts/**'
                ],
                tasks: ['jekyll:serve', 'less', 'uglify']
            },
        },
        
        // Deployment
        rsync: {
            options: {
                args: ['--verbose'],
                recursive: true,
                syncDest: true,
                compareMode: 'checksum',
                ssh: true
            },
            production: {
                options: {
                    src: '<%= config.site %>/',
                    dest: 'domains/kremalicious.com/html/',
                    host: 'kremalicious'
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
        'watch'
    ]);
    
    // Dev server
    grunt.registerTask('server', [
        'jekyll:serve',
        'less',
        'cmq',
        'cssmin',
        'uglify',
        'connect',
        'watch'
    ]);

    // Imagemin only task
    grunt.registerTask('imagemin', [
        'imagemin'
    ]);
    
    // Production build
    grunt.registerTask('build', [
        'clean',
        'jekyll:production',
        'imagemin',
        'less',
        'cmq',
        'cssmin',
        'uglify'
    ]);
    
    // Deploy
    grunt.registerTask('deploy', [
        'rsync'
    ]);

};