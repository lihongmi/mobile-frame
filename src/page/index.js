var $$api = require('script/api-config.js');
var $$cookie = require('lib/cookie.js');


var combiner = require('script/util/combiner.js');
combiner.push('replyMsg', $$api.get('api/getReplyMessageList'));
combiner.push('auditMsg', $$api.get('api/getAuditMessageList'));
combiner.request(function (cxt) {
    var messageNum = cxt.replyMsg.data.length + cxt.auditMsg.data.length;
    cxt.messageSum = messageNum;
    cxt.username = decodeURIComponent($$cookie.get('af3w43wc'));

    var i;
    for (i = 0; i < cxt.auditMsg.data.length; i++) {
        switch (cxt.auditMsg.data[i].status) {
        case 0:
            cxt.auditMsg.data[i].status = "未审核";
            break;
        case 1:
            cxt.auditMsg.data[i].status = "已审核";
            break;
        case 2:
            cxt.auditMsg.data[i].status = "审核驳回";
            break;
        }
    }

    var $$tmpl = require('./tmpl-adapter.js');
    var html = mdev.tmpl($$tmpl, cxt);
    mdev.dom.prepend(html);
});