var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    cleanCSS   = require('gulp-clean-css'),
    bump       = require('gulp-bump'),
    git        = require('gulp-git'),
    push       = require('gulp-git-push'),
    responsive = require('gulp-responsive-images'),
    cleanDest  = require('gulp-clean-dest'),
    release    = require('gulp-github-release'),
    ghPages    = require('gulp-gh-pages');

gulp.task('scripts', function(){
    
    gulp.src('js/**/*.js')
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js/'));
    
});

gulp.task('styles', function(){
    
    gulp.src('css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('minCSS/'));
    
});

gulp.task('imgResize', function () {
 return gulp.src('images_src/*.{png,jpg}')
     .pipe(cleanDest('images'))
     .pipe(responsive({
      '*': [{
        width: 200,
        rename: { suffix: '-200px' },
        quality: 70,
      }, {
        width: 500,
        rename: { suffix: '-500px' },
        quality: 70,
      }, {
        width: 630,
        rename: { suffix: '-630px' },
        quality: 70,
      }, {
        width: 900,
        rename: { suffix: '-@2x' },
        quality: 70,
      }, {
        rename: { suffix: '-original' },
      }],
    }, {
      //quality: 70,
      progressive: true,
      withMetadata: false,
    }))
    .pipe(gulp.dest('images'));
});

gulp.task('bump', function() {
  return gulp.src('./package.json')
        // bump package.json version 
        .pipe(bump({type: 'patch'}))
        // save bumped file into filesystem 
        .pipe(gulp.dest('./'))
        // commit changes 
        .pipe(git.commit('bump version'))
        // push local changes to repository 
        .pipe(push({                      
            repository: 'origin',
            refspec: 'HEAD'
        }));
});

gulp.task('release', function(){
  gulp.src('./**/*')
    .pipe(release({
      token: '46b5c63aec38b8eb03c4a7b6b1f47da62b0a3f64',                     // or you can set an env var called GITHUB_TOKEN instead 
      //owner: 'remixz',                    // if missing, it will be extracted from manifest (the repository.url field) 
      //repo: 'publish-release',            // if missing, it will be extracted from manifest (the repository.url field) 
      //tag: 'v1.0.0',                      // if missing, the version will be extracted from manifest and prepended by a 'v' 
      //name: 'publish-release v1.0.0',     // if missing, it will be the same as the tag 
      notes: 'very good!',                // if missing it will be left undefined 
      draft: false,                       // if missing it's false 
      //prerelease: false,                  // if missing it's false 
      manifest: require('./package.json') // package.json from which default values will be extracted if they're missing 
    }));
});

gulp.task('deploy', function() {
  return gulp.src('./**/*')
    .pipe(ghPages([
      {remoteUrl: "git+https://github.com/janosvincze/portfolio.git",
      branch: 'index'}
  ]));
});

gulp.task('watch', function() {
    gulp.watch('jd/*.js', ['scripts']);
    gulp.watch('css/*.css', ['styles']);
    
});

gulp.task('default',['scripts','styles']);