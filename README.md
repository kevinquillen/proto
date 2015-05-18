# Proto
Proto is a simple tool to help prototype quickly.

# Requirements
You will need to have npm, Bower, and Gulp.

# Using
Checkout or download the project to your directory of choice. Using terminal, navigate to the directory.

* Run bower install
* Run npm install
* Run gulp

Gulp will trigger Jekyll to build a static version of the site files, and any time SCSS, JS, Markdown or HTML files are added or changed,
Jekyll build command will trigger and reload all browsers running off BrowserSync.

# BrowserSync
You can open more browsers and point them to http://localhost:3000 to connect to BrowserSync.

BrowserSync will move all browsers in unison when navigating or scrolling, making prototyping a breeze while doing quick browser testing all
at once. Since browsers will reload automatically when changes happen, you can style quickly and leave your keyboard less.
