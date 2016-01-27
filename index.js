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
                    actionContext.getCookie = function (name) {
                        return cookies[name];
                    }
                }
            };
        }
    };
}

module.exports = cookiePlugin;
