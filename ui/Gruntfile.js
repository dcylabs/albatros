module.exports = function(grunt){

	var templateFiles = {}; 
	grunt.file.expand(['src/app/pages/**/*.html', 'src/app/templates/**/*.html']).forEach(function (src) {
		dest = src.replace(/^src\/app/,'temp');
		templateFiles[dest] = src;
	});


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {                             
	    	dist: {       
      			options: {
        			style: 'expanded'
      			},
      			files: {                   
        			'build/css/app.css': 'src/app/css/app.scss'
      			}
    		}
  		},		
		copy: {
  			app: {
    			files: [
      				{
      					expand: true, 
      					cwd: 'src/app/img/',
      					src: ['**'], 
      					dest: 'build/img'
      				},
      				{
      					expand: true, 
      					cwd: 'src/app/static/',
      					src: ['**'], 
      					dest: 'build/static'
      				},
      				{
      					expand: true, 
      					cwd: 'temp/pages/',
      					src: ['**'], 
      					dest: 'build/'
      				},
      				{
      					expand: true, 
      					cwd: 'temp/templates/',
      					src: ['**'], 
      					dest: 'build/templates'
      				}       				     				
      			]
  			}
		},
		 template: {
            'process-html-template': {
                options: {
                	data: {
                		pkg: grunt.file.readJSON('package.json')
                	},
                    delimiters: 'handlebars-like-delimiters'
                },
                files: templateFiles
            }
        },
		ngtemplates:{
			app:{
				cwd: 	'temp/templates/',
				src: 	'**/*.html',
				dest: 	'temp/js/app.templates.js'
			}
		},
		ngAnnotate:{
			options:{
				singleQuotes: true
			},
			app:{
				files:[
					{
						src: 	'src/app/js/**/*.js',
						dest: 	'temp/js/app.main.js'
					}
				]
			}
		},
		concat: {
		    app: { 
		        src: 	'temp/js/*.js',
		        dest: 	'temp/js/app.concat.js'
		    },
	      	vendor: {
	      		src: [
			        "vendor/bower_components/angular/angular.js",
			        "vendor/bower_components/angular-resource/angular-resource.js",
			        "vendor/bower_components/angular-route/angular-route.js",
			        "vendor/bower_components/angular-animate/angular-animate.js",
			        "vendor/bower_components/angular-websocket/angular-websocket.js",
			        "vendor/bower_components/underscore/underscore.js",
			        "vendor/bower_components/jquery/dist/jquery.js",
			        "vendor/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
			        "vendor/bower_components/sweetalert2/src/sweetalert2.js",
	      		],
	      		dest: 'temp/js/vendor.concat.js'
	      	},
	      	all: {
	      		src: [
	      			'temp/js/vendor.concat.js', 
	      			'temp/js/app.concat.js'
	      		],
	      		dest: 'temp/js/all.concat.js'
	      	}
		},	
		uglify: {
		    js: { 
		        src: 	'temp/js/all.concat.js',
		        dest: 	'build/js/app.js' 
		    }
		},
		clean: {
			temp: ['temp'],
		  	build: ['temp', 'build'],
		}					
	});

	grunt.loadNpmTasks('grunt-angular-templates');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-template');
	grunt.loadNpmTasks('grunt-contrib-sass');

	grunt.registerTask('build', [
		'clean:build',

		'template',
		'ngtemplates',

		'sass',

		'ngAnnotate',
		'concat',
		'uglify',

		'copy',
		'clean:temp'
	]);

}
