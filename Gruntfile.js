module.exports = function( grunt ) {
    "use strict";

	grunt.initConfig( {

		pkg: grunt.file.readJSON( "package.json" ),
        banner: "/*!\n" +
                " * <%= pkg.productname %> v<%= pkg.version %>\n" +
                " * <%= pkg.homepage %>\n" +
                " *\n" +
                " * Copyright (c) <%= pkg.year %>, <%= pkg.author.name %>\n" +
                " *\n" +
                " * Released under <%= pkg.license.name %> <%= pkg.license.version %>\n" +
                " * <%= pkg.license.url %>\n" +
                " */\n",
        variables: {
            "name": "<%= pkg.productname %>",
            "slug": "<%= pkg.slug %>",
            "prefix": "<%= pkg.prefix %>",
            "textdomain": "<%= pkg.textdomain %>",
            "version": "<%= pkg.version %>",
            "year": "<%= pkg.year %>",
            "description": "<%= pkg.description %>",
            "homepage": "<%= pkg.homepage %>",
            "author": "<%= pkg.author.name %>",
            "author_url": "<%= pkg.author.url %>",
            "license": "<%= pkg.license.name %>",
            "license_version": "<%= pkg.license.version %>",
            "license_url": "<%= pkg.license.url %>",
            "repository": "<%= pkg.repository.url %>",
            "bugs": "<%= pkg.bugs.url %>"
        },

        clean: {
            dist: {
                src: [ "dist", "./*.zip" ]
            },
            examples: {
                src: [ "examples" ]
            },
            documentation: {
                src: [ "documentation" ]
            },
            promo: {
                src: [ "promo" ]
            },
            temp: {
                src: [ "temp", "examples/examples", "documentation/documentation", "promo/promo" ]
            }
        },

        concat: {
            options: {
                banner: "<%= banner %>"
            },
            dist: {
                src: "build/adaptive-images.js",
                dest: "temp/dist/<%= pkg.textdomain %>-<%= pkg.version %>.js"
            },
            examples: {
                src: "build/adaptive-images.js",
                dest: "temp/examples/res/<%= pkg.textdomain %>.js"
            },
            documentation: {
                src: "build/adaptive-images.js",
                dest: "temp/documentation/res/<%= pkg.textdomain %>.js"
            },
            promo: {
                src: "build/adaptive-images.js",
                dest: "temp/promo/res/<%= pkg.textdomain %>.js"
            }
        },

        replace: {
            dist: {
                options: {
                    variables: "<%= variables %>",
                    prefix: "___",
                    force: true
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/dist/<%= pkg.textdomain %>-<%= pkg.version %>.js" ],
                        dest: "./dist/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "build/README.md" ],
                        dest: "./"
                    }
                ]
            },
            examples: {
                options: {
                    variables: "<%= variables %>",
                    prefix: "___",
                    force: true
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/examples/**", "!temp/examples/**/*.js" ],
                        dest: "./examples/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "build/build_general/3rdparty/jquery.sonar.min.js" ],
                        dest: "./examples/res/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/examples/**/*.js" ],
                        dest: "./examples/res/"
                    }
                ]
            },
            documentation: {
                options: {
                    variables: "<%= variables %>",
                    prefix: "___",
                    force: true
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/documentation/**", "!temp/documentation/**/*.js" ],
                        dest: "./documentation/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "build/build_general/3rdparty/jquery.sonar.min.js" ],
                        dest: "./documentation/res/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/documentation/**/*.js" ],
                        dest: "./documentation/res/"
                    }
                ]
            },
            promo: {
                options: {
                    variables: "<%= variables %>",
                    prefix: "___",
                    force: true
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/promo/**", "!temp/promo/**/*.js" ],
                        dest: "./promo/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "build/build_general/3rdparty/jquery.sonar.min.js" ],
                        dest: "./promo/res/"
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [ "temp/promo/**/*.js" ],
                        dest: "./promo/res/"
                    }
                ]
            }
        },

        uglify: {
            options: {
                preserveComments: false,
                report: "gzip"
            },
            dist: {
                files: {
                    "dist/<%= pkg.textdomain %>-<%= pkg.version %>.min.js":
                    "dist/<%= pkg.textdomain %>-<%= pkg.version %>.js"
                }
            }
        },

        zip: {
            "build": {
                cwd: "dist/",
                src: [ "dist/**" ],
                dest: "./<%= pkg.textdomain %>.zip"
            }
        },

        processhtml: {
            examples: {
                files: [ {
                    expand: true,
                    cwd: "build/build_examples",
                    src: [ "**/*.html" ],
                    dest: "temp/examples"
                } ]
            },
            documentation: {
                files: [ {
                    expand: true,
                    cwd: "build/build_documentation",
                    src: [ "**/*.html" ],
                    dest: "temp/documentation"
                } ]
            },
            promo: {
                files: [ {
                    expand: true,
                    cwd: "build/build_promo",
                    src: [ "**/*.html" ],
                    dest: "temp/promo"
                } ]
            }
        },

		less: {
			examples: {
				options: {
					compress: true
				},
				files: {
					"examples/res/style.css": "build/build_general/res/style.less"
				}
			},
			documentation: {
				options: {
					compress: true
				},
				files: {
					"documentation/res/style.css": "build/build_general/res/style.less"
				}
			},
			promo: {
				options: {
					compress: true
				},
				files: {
					"promo/res/style.css": "build/build_general/res/style.less"
				}
			}
		}

	} );

    grunt.loadNpmTasks( "grunt-contrib-clean" );
    grunt.loadNpmTasks( "grunt-contrib-concat" );
    grunt.loadNpmTasks( "grunt-replace" );
    grunt.loadNpmTasks( "grunt-contrib-uglify" );
    grunt.loadNpmTasks( "grunt-zip" );

    grunt.loadNpmTasks( "grunt-processhtml" );
	grunt.loadNpmTasks( "grunt-contrib-less" );

    grunt.registerTask( "dist", [
        "clean:dist",
        "concat:dist",
        "replace:dist",
        "uglify",
        "zip",
        "clean:temp"
    ] );
    grunt.registerTask( "examples", [
        "clean:examples",
        "processhtml:examples",
        "concat:examples",
        "less:examples",
        "replace:examples",
        "clean:temp"
    ] );
    grunt.registerTask( "documentation", [
        "clean:documentation",
        "processhtml:documentation",
        "concat:documentation",
        "less:documentation",
        "replace:documentation",
        "clean:temp"
    ] );
    grunt.registerTask( "promo", [
        "clean:promo",
        "processhtml:promo",
        "concat:promo",
        "less:promo",
        "replace:promo",
        "clean:temp"
    ] );
    grunt.registerTask( "all", [
        "dist",
        "examples",
        "documentation",
        "promo"
    ] );

	grunt.registerTask( "default", [ "dist" ] );

};
