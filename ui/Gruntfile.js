module.exports = function(grunt){

	var templateFiles = {}; 
	grunt.file.expand(['src/app/pages/**/*.html', 'src/app/templates/**/*.html']).forEach(function (src) {
		dest = src.replace(/^src\/app/,'temp');
		templateFiles[dest] = src;
	});


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint:{
			all: ['src/app/js/**/*.js']
		},
		watch:{
			js:{
				files:['src/app/js/**/*.js'],
				tasks:['ngAnnotate','concat','uglify']
			},
			css:{
				files:['src/app/css/**/*.scss'],
				tasks:['sass']
			},
			html:{
				files:['src/app/**/*.html'], 
				tasks:['template','ngtemplates','ngAnnotate','concat','uglify']
			}
		},
		sass: {                             
	    	dist: {       
      			options: {
        			style: 'compressed'
      			},
      			files: {                   
        			'build/css/app.css': 'src/app/css/app.scss',
        			'build/css/export/logs.css': 'src/app/css/export/logs.scss'
      			}
    		}
  		},		
		copy: {
  			app: {
    			files: [
      				{
      					src: ['vendor/bower_components/material-design-icons/iconfont/MaterialIcons-Regular.*'],
      					dest: 'build/webfonts/'
      				},    			
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
      					dest: 'build/'
      				},
      				{
      					expand: true, 
      					cwd: 'temp/pages/',
      					src: ['**'], 
      					dest: 'build/'
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
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('build', [
		'clean:build',

		'jshint',

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
