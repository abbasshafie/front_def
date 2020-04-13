module.exports = function(grunt)
{
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat:
        {
            scss:{
                src: ['assets/develop/scss/**/*.scss'],
                dest: 'assets/vendor/css/concat.scss'
            },
            scripts:{
                src: ['assets/develop/js/**/*.js'],
                dest: 'assets/vendor/js/concat.js'
            }
        },


        autoprefixer:
        {
            prefix:
            {
                files:
                {
                    'assets/vendor/css/pre.scss': ['assets/vendor/css/concat.scss']
                }
            }
        },

        sass:
        {
            dist:
            {
                options:
                {
                    style: 'compressed'
                },
                files:
                {
                    'assets/vendor/css/all.css': ['assets/vendor/css/pre.scss']
                }
            }
        },

        clean:
        {
            scss: ['assets/vendor/css/concat.scss','assets/vendor/css/pre.scss'],
            js: ['assets/vendor/js/concat.js']
        },

        copy:
        {
            main:
            {
                expand: true,
                cwd: 'assets/develop/css',
                src: '**',
                dest: 'assets/vendor/css',
            }
        },


       uglify:
        {
            script:
            {
                files:
                {
                    'assets/vendor/js/script.min.js': ['assets/vendor/js/concat.js']
                }
            }
        },
        watch:
        {
            sass:{
                files: ['assets/develop/scss/**/*.scss'],
                tasks: ['concat:scss' , 'autoprefixer' , 'sass' , 'clean:scss']
            },

            js:{
                files: ['assets/develop/js/**/*.js'],
                tasks: ['concat:scripts' , 'uglify' , 'clean:js']
            }
        }


    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
    
	grunt.registerTask('default', ['concat' , 'autoprefixer', 'sass' , 'copy' , 'uglify' , 'clean','watch']);
};