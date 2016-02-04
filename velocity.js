var Velocity = require('velocityjs');
var fs = require('fs');
var path = require('path');

var testPath = path.join(__dirname, 'src/page/index.conf');
var str = fs.readFileSync(testPath, 'utf8');

var Compile = Velocity.Compile;

var asts = Velocity.parse(str);

function getvariable (asts, key) {
    var value, key;
    asts.some(function (item) {
        if (item.type === 'set' && item.equal && item.equal.length) {
            if (item.equal[0].id === key) {
                if (item.equal[1].type === 'array') {
                    value = [];
                    item.equal[1].value.forEach(function (v) {
                        value.push(v.value);
                    });
                } else if (item.equal[1].type === 'map') {
                    value = {};
                    var temp;
                    for (key in item.equal[1].value) {
                        temp = [];
                        if (item.equal[1].value[key].value.length) {
                            item.equal[1].value[key].value.forEach(function (vv) {
                                 temp.push(vv.value);
                            });
                            value[key] = temp;
                        } else {
                            value[key] = item.equal[1].value[key].value;
                        }
                    }
                } else {
                    value = item.equal[1].value;
                }
            }
        }
    });
    return value;
};

var modules = getvariable(asts, 'modules');

// 获取路径模板
var getTpl = function (name) {
    var baseUrl = path.join(__dirname, 'src/widget'),
        resultPath = path.join(baseUrl, name, name +'.html');
    return fs.readFileSync(resultPath, 'utf8');
};

var replaceModuleToTpl = function (modules) {
    var key, newTpl = {};
    for (key in modules) {
        newTpl[key] = '';
        modules[key].forEach(function (item) {
            newTpl[key] += getTpl(item);
        });
    }
    return newTpl;
};
var modulesData = replaceModuleToTpl(modules);

var htmlTpl = fs.readFileSync(path.join(__dirname, 'src/layout/layout2/layout2.html'), 'utf8');

var asts_html = Velocity.parse(htmlTpl);
var config_html = {
    escape : false
}; 
var mainHtml = (new Compile(asts_html, config_html)).render(modulesData);

var pageConf = {};
pageConf.mainHtml = mainHtml;

var pageTpl = fs.readFileSync(path.join(__dirname, 'src/layout/tpl.html'), 'utf8')

var page_html = Velocity.parse(pageTpl);
var config_page = {
    escape : false
}; 

var endHtml = (new Compile(page_html, config_page)).render(pageConf);

console.log(endHtml);

var macros = {
  include: function(str) {
    var content = fs.readFileSync(path.join(__dirname, 'src', str), 'utf8');
    return content;
  }
};

