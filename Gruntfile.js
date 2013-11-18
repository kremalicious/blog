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
				src: '<%= config.src %>'
			},
        },
        
        // less
        less: {
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/kremalicious.min.css' : '<%= config.src %>/<%= config.assets.less %>/kremalicious.less'
                },
            },
        },
        
        // combine css media queries
        cmq: {
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/': ['<%= config.site %>/<%= config.assets.css %>/kremalicious.min.css']
                }
            }
        },
        
        // minify css
        cssmin: {
            production: {
                files: {
                    '<%= config.site %>/<%= config.assets.css %>/kremalicious.min.css': ['<%= config.site %>/<%= config.assets.css %>/*.css']
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
                    '<%= config.site %>/<%= config.assets.js %>/kremalicious.min.js': [
                        '<%= config.src %>/<%= config.assets.js %>/script.js'
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
                    '<%= config.src %>/_layouts/**'
                ],
                tasks: ['jekyll', 'less', 'uglify']
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
        'jekyll',
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
        'jekyll',
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