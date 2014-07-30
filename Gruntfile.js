module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    config: grunt.file.readYAML('phonegap-build.yaml'),
    "phonegap-build": {
      debug: {
        options: {
          archive: "app.zip",
          "appId": "<%= config.appId %>",
          "user": {
            "email": "<%= config.email %>"
          },
          download: {
            android: 'dist/units3-debug-<%= grunt.template.today("yyyy-mm-dd.HH-MM") %>.apk'
          }
        }
      }
    },
    clean: {
      dist: ["dist/*"],
      appzip: ["app.zip"]
    },
    compress: {
      main: {
        options: {
          archive: 'app.zip'
        },
        files: [
          {
          cwd: 'www/',
          expand: true,
          src: ['index.html', 'config.xml', 'css/ionic.app.min.css',
                'img/**', 'js/**', 'templates/**',
                'lib/angular-base64/angular-base64.min.js',
                'lib/angular-local-storage/angular-local-storage.min.js',
                'lib/ionic/fonts/*', 'lib/ionic/js/ionic.bundle.min.js']
          },
        ]
      }
    }
  });

  // Load tasks.
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-phonegap-build');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task.
  grunt.registerTask('default', ['clean:dist', 'compress', 'phonegap-build:debug', 'clean:appzip']);
};