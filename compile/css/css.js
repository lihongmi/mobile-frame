var Velocity = require('velocityjs');
var fs = require('fs');
var path = require('path');
var util = require('util');
var $$util = require('../util/util');

var outputCssString = function (pagename) {
    var i;
    var pageConf = $$util.getPageConf(pagename);
    var Compile = Velocity.Compile;
    var asts = Velocity.parse(pageConf);
    var cssArr = $$util.getvariable(asts, 'css');
    var modules = $$util.getvariable(asts, 'modules');
    var layout = $$util.getvariable(asts, 'layout');
    var sortModules = $$util.getSortModulesArr(modules);
    for (i = 0; i < cssArr.length; i++) {
        cssArr[i] = '../resource/global/' + cssArr[i];
    }
    cssArr.push('../resource/layout/' + layout + '/' + layout + '.css');
    sortModules.forEach(function (item) {
        cssArr.push('../resource/widget/' + item + '/' + item + '.css');
    });


    var cssTpl = '<link href="%s" rel="stylesheet" type="text/css">\
    ';
    for (i = 0; i < cssArr.length; i++) {
        cssArr[i] = util.format(cssTpl, cssArr[i]);
    }
};

module.exports = outputCssString;
