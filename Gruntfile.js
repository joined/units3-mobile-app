module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    "phonegap-build": {
      debug: {
        options: {
          archive: 'app.zip',
          "appId": "1028311",
          "user": {
            "email": "gasparini.lorenzo@gmail.com"
          }
        }
      }
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

  // Default task.
  grunt.registerTask('default', ['compress', 'phonegap-build:debug']);
};