module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        gitclone: {
            clone: {
                options: {
                    repository: 'https://github.com/ether/etherpad-lite.git',
                    tag: '1.3.0',
                    directory: 'app'
                }
            }
        },
        copy: {
            packagePlugins: {
                files: [
                    {expand: false, src: ['package.etherpad.json'], dest: 'app/package.json'},
                    {expand: false, src: ['settings.json.template'], dest: 'app/settings.json'}
                ]
            }
        },
        shell: {
            installPlugins: {
                options: {
                    stdout: true,
                    stderr: true,
                    execOptions: {
                        cwd: 'app'
                    }
                },
                command: 'npm install && sh bin/run.sh'
            }
        }
    });

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['gitclone', 'copy'], function () {
        var isCloned = grunt.file.exists('app');

        if (isCloned) {
            grunt.task.run(['copy', 'shell']);
        } else {
            grunt.task.run(['gitclone', 'copy', 'shell']);
        }
    });

};
