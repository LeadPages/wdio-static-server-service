# WDIO Static Server Service

[![npm](https://img.shields.io/npm/v/wdio-static-server-service.svg?style=flat-square)](https://www.npmjs.com/package/wdio-static-server-service) [![npm](https://img.shields.io/npm/dm/wdio-static-server-service.svg?style=flat-square)](https://www.npmjs.com/package/wdio-static-server-service) [![npm](https://img.shields.io/npm/l/wdio-static-server-service.svg?style=flat-square)](https://www.npmjs.com/package/wdio-static-server-service)

Some projects are front-end assets only and don't run on more than a static server. This service helps you to run a static file server during testing.

## Installation

The easiest way is to keep `wdio-static-server-service` as a devDependency in your `package.json`.

```json
{
  "devDependencies": {
    "wdio-static-server-service": "^1.0.0"
  }
}
```

You can simple do it by:

```bash
npm install wdio-static-server-service --save-dev
```

Instructions on how to install `WebdriverIO` can be found [here.](http://webdriver.io/guide/getstarted/install.html)

## Configuration

In order to use the static server service you need to add `static-server` to your service array:

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['static-server'],
  // ...
};
```

## Options

### staticServerFolders (required)
Array of folder paths and mount points.

Type: `Array<Object>`
Props:
 - mount `{String}` - URL endpoint where folder will be mounted.
 - path `{String}` - Path to the folder to mount.

``` javascript
 // wdio.conf.js
 export.config = {
   // ...
   staticServerFolders: [
     { mount: '/fixtures', path: './tests/fixtures' }
     { mount: '/dist', path: './dist' },
   ],
   // ...
 };
```

### staticServerPort

Port to bind the server.

Type: `Number`

Default: `4567`

### staticServerLog

Debugging logs, will print mount points and requests. When `staticServerLogs` is set to `true` it will print into the console. Otherwise a string will be treated as the log folder.

Type: `Boolean` or `String`

### staticServer404

Path to 404 file (useful for html5 routing that should always fallback to an index.html)

Type: `String`

Default: none

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).
