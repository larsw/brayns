'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    BraynsGenerator

BraynsGenerator = module.exports = function BraynsGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments)

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] })
    })

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')))
}

util.inherits(BraynsGenerator, yeoman.generators.NamedBase)

BraynsGenerator.prototype.askFor = function askFor() {
    var cb = this.async(),
        welcome =
        '\n         _-----_' +
        '\n        |             |' +
        '\n        |' + '--(o)--'.red + '|     .--------------------------.' +
        '\n     `---------´    |        ' + 'Welcome to Yeoman,'.yellow.bold + '        |' +
        '\n        ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '     |     ' + 'ladies and gentlemen!'.yellow.bold + '    |' +
        '\n        /___A___\\     \'__________________________\'' +
        '\n         |    ~    |'.yellow +
        '\n     __' + '\'.___.\''.yellow + '__' +
        '\n ´     ' + '`    |'.red + '° ' + '´ Y'.red + ' `\n',
        prompt

    console.log(welcome)

    prompts = [{
        name: 'someOption',
        message: 'Would you like to enable this option?',
        default: 'Y/n',
        warning: 'Yes: Enabling this will be totally awesome!'
    }]

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err)
        }

        this.someOption = (/y/i).test(props.someOption)

        cb()
    }.bind(this))
}

BraynsGenerator.prototype.app = function app() {
    this.mkdir('static')
    this.mkdir('static/source')
    this.mkdir('static/build')
    this.mkdir('static/tmp')

    this.copy('_package.json', 'package.json')
    this.copy('_Gruntfile.js', 'Gruntfile.js')
}

BraynsGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig')
    this.copy('gitattributes', '.gitattributes')
    this.copy('gitignore', '.gitignore')
    this.copy('jshintrc', '.jshintrc')
    this.copy('travis.yml', '.travis.yml')
}
