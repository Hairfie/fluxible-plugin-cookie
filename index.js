'use strict';

var cookie = require('cookie');

function cookiePlugin() {
    return {
        name: 'CookiePlugin',
        plugContext: function (options) {
            var req = options.req;
            var res = options.res;

            var cookies = req ? req.cookies : cookie.parse(document.cookie);

            // same plugin for action and store contexts.
            // give them both access to cookies
            var contextPlug = function (context) {
                context.setCookie = function (name, value, options) {
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
                context.getCookie = function (name) {
                    return cookies[name];
                }
            }

            return {
                plugActionContext: contextPlug,
                plugStoreContext: contextPlug
            };
        }
    };
}

module.exports = cookiePlugin;
