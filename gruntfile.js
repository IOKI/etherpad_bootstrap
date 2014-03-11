module.exports = function (grunt) {
    'use strict';

    var plugins = grunt.file.readJSON('package.etherpad.json').dependencies,
        repository = 'https://api.github.com/repos/IOKI/',
        tasks = {
            gitclone: {
                clone: {
                    options: {
                        repository: 'https://github.com/IOKI/' + 'etherpad-lite.git',
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
                run: {
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
        },
        pluginArray = [],
        plugin;

    for (plugin in plugins) {
        if (plugins.hasOwnProperty(plugin)) {
            pluginArray.push(plugin);

            tasks.shell[plugin] = {
                options: {
                    stdout: true,
                    stderr: true,
                    execOptions: {
                        cwd: 'app'
                    }
                },
                command: 'npm install ' + repository + plugin + '/tarball'
            };
        }
    }

    grunt.initConfig(tasks);

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['gitclone', 'copy', 'shell'], function () {
        var isCloned = grunt.file.exists('app'),
            runArray = ['shell:run'];

        pluginArray.forEach(function (item) {
            runArray.unshift('shell:' + item);
        });

        if (isCloned) {
            grunt.task.run(['copy'].concat(runArray));
        } else {
            grunt.task.run(['gitclone', 'copy'].concat(runArray));
        }

    });

    grunt.registerTask('run', ['shell'], function () {
        grunt.task.run(['copy', 'shell:run'])
    });

};
