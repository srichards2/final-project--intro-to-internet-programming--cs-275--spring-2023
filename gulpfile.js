const { src, dest, series, watch } = require(`gulp`);
const htmlCompressor = require(`gulp-htmlmin`);
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
const jsLinter = require(`gulp-eslint`);
const jsCompressor = require(`gulp-uglify`);

let compileCSS = () => {
    return src(`dev/css/style.css`)
        .pipe(CSS({
            outputStyle: `expanded`,
            precision: 10
        }).on(`error`, CSS.logError))
        .pipe(dest(`css/`));
};


let compressHTML = () => {
    return src(`dev/html/index.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`compressed-html/`));
};

let compressJS = () => {
    return src(`dev/js/app.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`compressed-scripts`));
};

let lintCSS = () => {
    return src(`dev/css/style.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }));
};

let lintJS = () => {
    return src(`dev/js/app.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

let serve = () => {
    browserSync({
        notify: true,
        reloadDelay: 0, // A delay is sometimes helpful when reloading at the
        server: {       // end of a series of tasks.
            baseDir: [
                `./`,
                `html`,
                `css`,
                `js`
            ]
        }
    });

    watch(`dev/html/index.html`).on(`change`, reload);
};

let validateHTML = () => {
    return src(`html-files/index.html`)
        .pipe(htmlValidator());
};

exports.validateHTML = validateHTML;
exports.serve = serve;
exports.lintJS = lintJS;
exports.lintCSS = lintCSS;
exports.compressHTML = compressHTML;
exports.compileCSS = compileCSS;
exports.default = series(lintCSS, lintJS, serve);
exports.build = series(compressHTML, compileCSS, compressJS, serve);
