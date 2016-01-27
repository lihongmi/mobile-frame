var Velocity = require('velocityjs');
var fs = require('fs');
var path = require('path');

var testPath = path.join(__dirname, 'src/page/index.html');
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
                    for (key in item.equal[1].value) {
                        value[key] = item.equal[1].value[key].value;
                    }
                } else {
                    value = item.equal[1].value;
                }
            }
        }
    });
    return value;
};


console.log(getvariable(asts, 'modules'));
var macros = {
  include: function(str){
    var content = fs.readFileSync(path.join(__dirname, 'src', str), 'utf8');
    return content;
  }
};