'use strict';
var util = require('util'),
    path = require('path'),
    fs = require('fs'),
    yeoman = require('yeoman-generator'),
    parts = require('./parts.js'),
    BraynsGenerator

BraynsGenerator = module.exports = function BraynsGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments)

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] })
    })

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')))
}

util.inherits(BraynsGenerator, yeoman.generators.NamedBase)

BraynsGenerator.prototype.askForStuff = function askForPackageJSON() {
    var cb = this.async(),
        dirname = this.destinationRoot().split(path.sep),
        prompts = [
            {
                name: 'bootstrap',
                message: 'Would you like to use Bootstrap + jQuery? If not, you\'ll still get a basic skeleton',
                default: 'Y/n'
            },
            {
                name: 'travis',
                message: 'Are you going to use Travis CI?',
                default: 'Y/n'
            },
            {
                name: 'packageName',
                message: 'What is this package\'s name?',
                default: dirname[dirname.length - 1]
            },
            {
                name: 'packageDesc',
                message: 'What is this package\'s description?',
                default: 'Awesome.'
            },
            {
                name: 'github',
                message: 'What is your GitHub username?',
            },
            {
                name: 'authorName',
                message: 'What is your name?'
            },
            {
                name: 'authorEmail',
                message: 'What is your email address?'
            },
            {
                name: 'authorWebsite',
                message: 'What is your website?'
            }
        ]

    this.prompt(prompts, function (err, props) {
        if (err) {
            return this.emit('error', err)
        }

        this.opts = {
            bootstrap: (/y/i).test(props.bootstrap),
            author: {
                ghUserName: props.github
            },
            travis: (/y/i).test(props.travis),
            year: new Date().getFullYear()
        }

        this.opts['package'] = {
            name: props.packageName,
            desc: props.packageDesc
        }

        this.opts.contributor = props.authorName
        if (props.authorEmail !== '' && typeof props.authorEmail === 'string') {
            this.opts.contributor += ' <' + props.authorEmail + '>'
        }
        if (props.authorWebsite !== '' && typeof props.authorWebsite === 'string') {
            this.opts.contributor += '  (' + props.authorWebsite + ')'
        }

        cb()
    }.bind(this))
}

BraynsGenerator.prototype.app = function app() {
    parts.setupBaseDirs(this)
    parts.setupBaseJS(this)

    if (this.opts.bootstrap === true) {
        parts.setupBootstrap(this)
    }
    else {
        parts.setupSkeleton(this)
    }

    parts.doCustomizations(this)
    parts.setupDotFiles(this)
}
