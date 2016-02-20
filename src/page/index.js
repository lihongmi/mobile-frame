var data = {
    list: [
        {a: 1, b: 2, c: 3}
    ]
};

var tpl = $('.main-wrapper').html();
var html = velocityjs.render(tpl, data);
$('.main-wrapper').html(html);