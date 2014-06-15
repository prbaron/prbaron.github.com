module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg   : grunt.file.readJSON('package.json'),
        shell : {
            bowerUpdate : {
                command : "bower update"
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },
        bower : {
            install : {
                options : {
                    targetDir     : '.',
                    cleanBowerDir : true
                }
            }
        },
        less  : {
            dist  : {
                options : {

                    cleancss   : true,
                },
                files   : {
                    "css/style.css" : "_less/style.less"
                }
            }
        },
        watch : {
            files   : [
                '_config.yml',
                '**/*.html',
                'js/*.js',
                '_less/*.less',
                '!_site/**/*.html' // ignore files from _site
            ],
            tasks   : ['shell:jekyllServe'],
            options : {
                interrupt  : true,
                atBegin    : true,
                livereload : true
            }
        }
    });

    // prepare bower dependencies
    grunt.registerTask('bowerify', ['shell:bowerUpdate', 'bower:install']);

    // launch jekyll command
    grunt.registerTask('jekyll', ['less', 'shell:jekyllServe']);
};