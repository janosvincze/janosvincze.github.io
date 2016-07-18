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


// Clean/minimize CSS files

gulp.task('styles', function(){
    
    gulp.src('css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('minCSS/'));
    
});

// Resizing images from images_src directory to images

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

// Bump package.json version, and push local changes to repository

gulp.task('bump', function() {
  return gulp.src('./package.json')
        .pipe(bump({type: 'patch'}))
        .pipe(gulp.dest('./'))
        .pipe(git.commit('bump version'))
        .pipe(push({                      
            repository: 'origin',
            refspec: 'HEAD'
        }));
});

// Git: Commit changes

gulp.task('commit', function(){
  return gulp.src(['./index.html','./images/*','./images/*.svg','./css/*','./font/*','./gulpfile.js', './README.md'])
    .pipe(git.commit('Commit with Gulp', {
      args: '--allow-empty -m "initial commit"',
      disableMessageRequirement: true,
      quiet: true
    }));
});

// Git: Push it to master

gulp.task('push', function(){
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

// Git: Commit changes and push it to master

gulp.task('upload', function (cb) {
  runSeq('commit', 'push', cb);
});

// Watch changes

gulp.task('watch', function() {
    //gulp.watch('jd/*.js', ['scripts']);
    gulp.watch('css/*.css', ['styles']);
    
});

gulp.task('default',['styles']);