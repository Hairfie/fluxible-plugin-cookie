'use strict';

var cookie = require('cookie');

function cookiePlugin() {
    return {
        name: 'CookiePlugin',
        plugContext: function (options) {
            var req = options.req;
            var res = options.res;

            var cookies = req ? req.cookies : cookie.parse(document.cookie);

            return {
                plugActionContext: function (actionContext) {
                    actionContext.setCookie = function (name, value, options) {
                        var cookieStr = cookie.serialize(name, value, options);
                        if (res) {
                            var pendingCookiesArray = res.getHeader('Set-Cookie') || [];
                            var newCookiesArray = pendingCookiesArray.concat(cookieStr);
                            res.setHeader('Set-Cookie', newCookiesArray);
                        } else {
                            document.cookie = cookieStr;
                        }
                        cookies[name] = value;
                    };
                    actionContext.getCookie = function (name) {
                        return cookies[name];
                    }
                }
            };
        }
    };
}

module.exports = cookiePlugin;
