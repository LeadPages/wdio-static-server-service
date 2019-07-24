import express from 'express';
import fs from 'fs-extra';
import Log from 'log';
import morgan from 'morgan';
import path from 'path';
import {createServer} from 'https';

const DEFAULT_LOG_NAME = 'static-server.txt';

export default class StaticServerLauncher {
  onPrepare({
    staticServerFolders: folders,
    staticServerLog: logging = false,
    staticServerPort: port = 4567,
    httpsConfig: httpsConfig = false,
    staticServerMiddleware: middleware = []
  }) {
    if (!folders) {
      return Promise.resolve();
    }

    this.server = express();
    this.folders = folders;
    this.port = port;

    if (logging) {
      let stream;
      if (typeof logging === 'string') {
        const file = path.join(logging, DEFAULT_LOG_NAME);
        fs.createFileSync(file);
        stream = fs.createWriteStream(file);
      }
      this.log = new Log('debug', stream);
      this.server.use(morgan('tiny', { stream }));
    } else {
      this.log = new Log('emergency');
    }

    (Array.isArray(folders) ? folders : [ folders ]).forEach((folder) => {
      this.log.debug('Mounting folder `%s` at `%s`', path.resolve(folder.path), folder.mount);
      this.server.use(folder.mount, express.static(folder.path));
    });

    middleware.forEach((ware) => {
      this.server.use(ware.mount, ware.middleware);
    });

    return new Promise((resolve, reject) => {
      if (typeof httpsConfig === 'object') {
        const {keyPath, certPath} = httpsConfig;
        const getFile = (filePath) => {
          return new Promise((res, rej) => {
            fs.readFile(path.resolve(filePath), 'utf8', (err, data) => {
              if (err) {
                rej(err);
              }
              res(data);
            });
          });
        };

        Promise.all([getFile(keyPath), getFile(certPath)])
          .then((paths) => {
            const [key, cert] = paths;
            createServer({key, cert}, this.server)
              .listen(port, (err) => {
                if (err) {
                   reject(err);
                }
                this.log.info(`Static server running at https://localhost:${port}`);
                resolve();
              });
          })
          .catch((err) => {
            this.log.error(err);
          });
      } else {
        this.server.listen(this.port, (err) => {
          if (err) {
            reject(err);
          }

          this.log.info(`Static server running at http://localhost:${port}`);
          resolve();
        });
      }
    });
  }

}
