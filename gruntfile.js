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
                        {expand: false, src: ['settings.json.template'], dest: 'app/settings.json'},
                        {expand: true, cwd: 'static/', src: ['**'], dest: 'app/nmel_frame/'}
                    ]
                }
            },
            shell: {
                start: {
                    options: {
                        stdout: true,
                        stderr: true,
                        execOptions: {
                            cwd: 'app'
                        }
                    },
                    command: 'sh bin/start.sh &'
                },
                stop: {
                    options: {
                        stdout: true,
                        stderr: true,
                        execOptions: {
                            cwd: 'app'
                        }
                    },
                    command: 'sh bin/stop.sh &'
                },
                setup: {
                    options: {
                        stdout: true,
                        stderr: true,
                        execOptions: {
                            cwd: 'app'
                        }
                    },
                    command: 'npm install && sh bin/setup.sh'
                },
                kill: {
                    options: {
                        stdout: true,
                        stderr: true,
                        execOptions: {
                            cwd: 'app'
                        }
                    },
                    command: 'sh bin/kill.sh &'
                },
                reload: {
                    options: {
                        stdout: true,
                        stderr: true,
                        execOptions: {
                            cwd: 'app'
                        }
                    },
                    command: 'sh bin/reload.sh &'
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
                command: 'npm install "' + repository + plugin + '/tarball?client_id=a5c100ced86b21a7e26a&client_secret=a6dbc47d29d059fcc7fa35e3c5c4affae7edea22"'
            };
        }
    }

    grunt.initConfig(tasks);

    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['gitclone', 'copy', 'shell'], function () {
        var isCloned = grunt.file.exists('app'),
            runArray = ['shell:setup', 'shell:start'];

        pluginArray.forEach(function (item) {
            runArray.unshift('shell:' + item);
        });

        if (isCloned) {
            grunt.task.run(['copy'].concat(runArray));
        } else {
            grunt.task.run(['gitclone', 'copy'].concat(runArray));
        }

    });

    grunt.registerTask('start', ['shell'], function () {
        grunt.task.run(['shell:start']);
    });

    grunt.registerTask('stop', ['shell'], function () {
        grunt.task.run(['shell:stop']);
    });

    grunt.registerTask('kill', ['shell'], function () {
        grunt.task.run(['shell:kill']);
    });

    grunt.registerTask('reload', ['shell'], function () {
        grunt.task.run(['shell:reload']);
    });

};
