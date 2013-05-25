var Hogan = require('hogan.js'),
    hoganCopy = function (that, ifname, ofname) {
        var template = that.read(ifname)
            data = Hogan.compile(template).render(that.opts)

        that.write(ofname, data)
    }

module.exports.setupBaseDirs = function (that) {
    that.mkdir('static')
    that.mkdir('static/source')
    that.mkdir('static/source/jade')
    that.mkdir('static/source/img')
    that.mkdir('static/source/js')
    that.mkdir('static/source/js/main')
    that.mkdir('static/source/stylus')
    that.mkdir('static/source/stylus/main')
    that.mkdir('static/build')
    that.mkdir('static/tmp')
}

module.exports.setupBaseJS = function (that) {
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
    that.copy('travis.yml', '.travis.yml')
}

module.exports.setupBootstrap = function (that) {
    hoganCopy(that, 'package.json', 'package.json')
    that.mkdir('static/source/bootstrap')
    that.copy('static-b/init.styl', 'static/source/stylus/main/init.styl')
    that.copy('static-b/css/bootstrap.min.css', 'static/source/bootstrap/css/bootstrap.min.css')
    that.copy('static-b/js/jquery.min.js', 'static/source/jquery.min.js')
    that.copy('static-b/js/bootstrap.min.js', 'static/source/bootstrap/js/bootstrap.min.js')
    that.copy('static-b/img/glyphicons-halflings.png', 'static/source/bootstrap/img/glyphicons-halflings.png')
    that.copy('static-b/img/glyphicons-halflings.png', 'static/source/bootstrap/img/glyphicons-halflings-white.png')
}

module.exports.setupSkeleton = function (that) {
    hoganCopy(that, 'static-s/index.jade', 'static/source/jade/index.jade')
    require('./skeleton.js')(that)
}
