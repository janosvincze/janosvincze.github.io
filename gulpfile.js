var gulp       = require('gulp'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    cleanCSS   = require('gulp-clean-css'),
    bump       = require('gulp-bump'),
    git        = require('gulp-git'),
    push       = require('gulp-git-push'),
    responsive = require('gulp-responsive-images'),
    cleanDest  = require('gulp-clean-dest'),
    runSeq     = require('run-sequence');

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


gulp.task('commit', function(){
  return gulp.src(['./index.html','./images/*','./css/*','./font/*','./gulpfile.js'])
    .pipe(git.commit('Commit with Gulp', {
      args: '--allow-empty -m "initial commit"',
      disableMessageRequirement: true,
      quiet: true
    }));
});

gulp.task('push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});


gulp.task('upload', function (cb) {
  runSeq('commit', 'push', cb);
});

gulp.task('watch', function() {
    gulp.watch('jd/*.js', ['scripts']);
    gulp.watch('css/*.css', ['styles']);
    
});

gulp.task('default',['scripts','styles']);