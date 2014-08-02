// This file is used to trigger the online PhoneGap Build service,
// uploading the zipped project and downloading the app which is built.

module.exports = function (grunt) {
	// Project configuration
	grunt.initConfig({
		connect: {
		  server: {
		    options: {
		      port: 9000,
		      base: 'www',
		      livereload: true,
		      open: true,
		      useAvailablePort: true,
		      hostname: '127.0.0.1'
		    }
		  }
		},
		watch: {
		  all: {
		    files: ['**', '!scss/*'],
		    options: {
		      cwd: 'www',
		      livereload: true,
		      spawn: false,
		    },
		  },
		  scss: {
		  	files: ['scss/*'],
		  	tasks: ['sass:dist', 'cssmin'],
		  	options : {
		  		loadPath: './',
		  		cwd: 'www',
		  		livereload: true,
		  		spawn: false
		  	}
		  }
		},
		sass: {
			dist: {
			    files: { 'www/css/ionic.app.css' : 'www/scss/ionic.app.scss' }
			}
		},
		cssmin: {
			minify: {
			  files: { 'www/css/ionic.app.min.css' : 'www/css/ionic.app.css' }
			}
		},
		"phonegap-build": {
			debug: {
				options: {
					archive: "app.zip",
					appId: "<%= pginfo.appId %>",
					user: {
						email: "<%= pginfo.email %>"
					},
					download: {
						android: 'dist/units3-debug-<%= grunt.template.today("yyyy-mm-dd.HH-MM") %>.apk'
					}
				}
			}
		},
		mkdir: {
			dist: {
				options: { create: ['dist'] }
			}
		},
		clean: {
			dist: ["dist/*"],
			appzip: ["app.zip"]
		},
		compress: {
			main: {
				options: { archive: 'app.zip' },
				files: [
					{
					cwd: 'www/',
					expand: true,
					src: ['index.html',
								'config.xml', 
								'css/ionic.app.min.css',
								'img/**',
								'js/**',
								'templates/**',
								'lib/angular-base64/angular-base64.min.js',
								'lib/angular-local-storage/angular-local-storage.min.js',
								'lib/ionic/fonts/*',
								'lib/ionic/js/ionic.bundle.min.js'
						 ]
					},
				]
			}
		}
	});

	// Load tasks.
	grunt.loadNpmTasks('grunt-phonegap-build');
	grunt.loadNpmTasks('grunt-mkdir');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('serve', function() {
		if (!grunt.file.exists('www/css/ionic.app.min.css')) {
			grunt.task.run(['sass:dist', 'cssmin']);
		}
		grunt.task.run(['connect', 'watch']);
	});

	// Default task.
	grunt.registerTask('onlinebuild', function() {
		if (!grunt.file.exists('phonegap-build.yaml')) {
			grunt.fail.fatal("Build config file not found.");
		} else {
			grunt.config.set("pginfo", grunt.file.readYAML('phonegap-build.yaml'));
			grunt.task.run(['clean:dist',
							'mkdir:dist',
							'compress',
							'phonegap-build:debug',
							'clean:appzip']
			);
		}
	});
};