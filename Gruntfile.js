module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg    : grunt.file.readJSON('package.json'),
        bower  : {
            install : {
                options : {
                    targetDir     : '.',
                    cleanBowerDir : true
                }
            }
        },
        clean  : ['_site'],
        concat : {
            vendor : {
                src  : [
                    '_vendors/jquery/jquery.min.js',
                    '_vendors/bootstrap/bootstrap.min.js'
                ],
                dest : 'js/vendor.all.js'
            }
        },
        less   : {
            dist : {
                options : {
                    paths    : ["css"],
                    compress : true,
                    cleancss : true
                },
                files   : {
                    "css/style.css" : "_less/style.less"
                }
            }
        },
        shell  : {
            bowerUpdate : {
                command : "bower update"
            },
            jekyllServe : {
                command : 'kill -9 1234; jekyll serve -w'
            }
        },
        watch  : {
            jekyll : {
                files : [
                    '_config.yml',
                    '_less/*.less',
                    'js/*.js'
                ],
                tasks : ['default']
            }
        }
    });

    grunt.registerTask('bowerify', [
        'shell:bowerUpdate',
        'bower:install',
        'concat',
        'less'
    ]);

    grunt.registerTask('default', [
        'clean',
        'bowerify',
        'shell:jekyllServe'
    ]);
};