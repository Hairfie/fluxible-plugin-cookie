'use strict';

var cookie = require('cookie');
var merge = require('utils-merge');

function cookiePlugin() {
    return {
        name: 'CookiePlugin',
        plugContext: function (options) {
            var req = options.req;
            var res = options.res;

            var cookies = req ? req.cookies : cookie.parse(document.cookie);

            // give all context types access to cookies
            var contextPlug = function (context) {
                context.setCookie = function (name, value, options) {
                    var cookieStr = cookie.serialize(name, value, options);
                    if (res) {
                        var header = res.getHeader('Set-Cookie') || [];
                        if (!Array.isArray(header)) {
                            header = [header];
                        }
 
                        header.push(cookieStr);
                        res.setHeader('Set-Cookie', header);
                    } else {
                        document.cookie = cookieStr;
                    }
                    cookies[name] = value;
                };
                context.clearCookie = function (name, options) {
                    context.setCookie(name, "", merge({ expires: new Date(1), path: '/' }, options));
                    delete cookies[name];
                };
                context.getCookie = function (name) {
                    return cookies[name];
                };
            }

            return {
                plugActionContext: contextPlug,
                plugComponentContext: contextPlug,
                plugStoreContext: contextPlug
            };
        }
    };
}

module.exports = cookiePlugin;
