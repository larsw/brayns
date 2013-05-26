var Hogan = require('hogan.js'),
    hoganCopy = function (that, ifname, ofname) {
        var template = that.read(ifname)
            data = Hogan.compile(template).render(that.opts)

        that.write(ofname, data)
    }

module.exports.setupBaseDirs = function (that) {
    require('./setup-base-dirs.js')(that.mkdir)
}

module.exports.setupBaseStaticFiles = function (that) {
    that.copy('static/404.jade', 'static/source/jade/404.jade')
    that.copy('static/favicon.ico', 'static/build/img/favicon.ico')
    that.copy('static/robots.txt', 'static/source/robots.txt')
    that.copy('static/script.js', 'static/source/js/main/script.js')
}

module.exports.doCustomizations = function (that) {
    hoganCopy(that, 'package.json', 'package.json')
    hoganCopy(that, 'Gruntfile.js', 'Gruntfile.js')
    hoganCopy(that, 'README.md', 'README.md')
    hoganCopy(that, 'LICENSE', 'LICENSE')
}

module.exports.setupDotFiles = function (that) {
    that.copy('editorconfig', '.editorconfig')
    that.copy('gitattributes', '.gitattributes')
    that.copy('gitignore', '.gitignore')
    that.copy('jshintrc', '.jshintrc')
    if (that.opts.travis === true) {
        that.copy('travis.yml', '.travis.yml')
    }
}

module.exports.setupBootstrap = function (that) {
    hoganCopy(that, 'static-b/layout.jade', 'static/source/jade/layout.jade')
    hoganCopy(that, 'static-b/index.jade', 'static/source/jade/index.jade')
    that.mkdir('static/source/bootstrap')
    that.copy('static-b/init.styl', 'static/source/stylus/main/init.styl')
    that.copy('static-b/css/bootstrap.min.css', 'static/source/bootstrap/bootstrap.min.css')
    that.copy('static-b/js/bootstrap.min.js', 'static/source/bootstrap/bootstrap.min.js')
    that.copy('static-b/img/glyphicons-halflings.png', 'static/build/img/glyphicons-halflings.png')
    that.copy('static-b/img/glyphicons-halflings.png', 'static/build/img/glyphicons-halflings-white.png')
}

module.exports.setupSkeleton = function (that) {
    hoganCopy(that, 'static-s/layout.jade', 'static/source/jade/layout.jade')
    hoganCopy(that, 'static-s/index.jade', 'static/source/jade/index.jade')
    require('./skeleton.js')(that)
}
