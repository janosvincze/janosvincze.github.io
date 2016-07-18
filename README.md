# Portfolio Site
Using html/css to build responsive site

## Content
* Site Structure
* Gulp
* Sources

## Site Structure

### Base structure
I used grid based structure with 12 columns:  
```
<div class="container">
    <div class="row">
        <div class="col-5">
            ...
        </div>
        <div class="col-7">
            ...
        </div>
    </div>
</div>
```

### Responsiveness
- Using media query to change the layout in <picture> and CSS.
- Using flex attribute to wrap "Featured work" area.

## Gulp

I used [Gulp](http://http://gulpjs.com/) to automate images resizing, and to commit and push the changes to GitHub, as you can see in [gulpfile.js](gulpfile.js).

Resize image with suffix from images_src directory to images: 
```
gulp imgResize
```

Commit and push changes to GitHub (before using it, you should link manually your repository): 
```
gulp upload
```

## Sources

Used images from:
* [Pixaby](https://pixabay.com/)
* [PEXELS](https://www.pexels.com/)



