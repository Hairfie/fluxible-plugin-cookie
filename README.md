Cookie Plugin for Fluxible
==========================

Easily read / write cookies from your fluxible application.

Install
-------

Add the package to your project :

    npm install --save fluxible-plugin-cookie

Plug it to your fluxible instance :

```javascript

import cookiePlugin from 'fluxible-plugin-cookie';

app.plug(cookiePlugin());

```

In your connect/express server side include cookieParser and add req/res to the context :

```javascript
import cookieParser from 'cookie-parser';

server.use(cookieParser());

server.use((req, res, next) => {

    const context = app.createContext({ req, res });

    // ...

});

```

Action Context
--------------

The module adds the following methods to your action context :

 - setCookie(name, value[, options])
 - getCookie(name)

The `setCookie` method internally uses the `cookie` package, so for more
informations about the supported options, please have a look at the
[cookie package's doc](https://www.npmjs.com/package/cookie).
