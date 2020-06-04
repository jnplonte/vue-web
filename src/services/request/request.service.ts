import axios from 'axios';

import { Logger } from '@/services/logger/logger.service';
import { Helper } from '@/services/helper/helper.service';

const api = 'VUE_APP_API_';

const handleResponse: Function = (response) => {
  const boolean = response.status === 200 && (response.data && (response.data.status === 200 || response.data.status === 'success'));

  return boolean ? response.data : {
    failed: true,
    message: (response.data && response.data.message) ? response.data.message : 'server-error'
  };
};

const handleError: Function = (error, type?) => {
  // const errData = (error && error.response)this.helper.get(error, 'response.data', error);
  // this.logger.error(type, errData);

  return type === 'GET'
    ? null
    : {
      failed: true,
      message: error
    };
};

export class Request {
  logger: Logger;
  helper: Helper;
  service: any;

  constructor(contentType: string = 'application/json', auth?: string, key?: string) {
    this.logger = new Logger();
    this.helper = new Helper();

    const headers: Object = {
      'Content-Type': contentType,
      [process.env.VUE_APP_SECRET_KEY]: auth
        ? auth
        : key
          ? key
          : process.env.VUE_APP_SECRET_KEY_ENCODED_HASH
    };

    this.service = axios.create({
      'headers': headers
    });
  }

  getFullPath(name: string = 'core', path: string = '/'): string {
    const url = process.env[`${api}${name}`];
    return `${url}/${path}`;
  }

  get(name: string = 'core', path: string = '', params: object = {}, isFullPath: boolean = false) {
    const url = process.env[`${api}${name}`];
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    return this.service
      .get(fullPath, {params: params})
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error, 'GET'));
  }

  getAll(paths: string[] = []) {
    const promises: Array<any> = [];

    paths.forEach((dataval) => {
      promises.push(this.get('', dataval, null, true));
    });

    return Promise.all(promises)
      .then((results) => {
        return results;
      })
      .catch((error) => {
        const errData = this.helper.get(error, 'response.data', error);
        this.logger.error('GET ALL', errData);

        return null;
      });
  }

  post(name: string = 'core', path: string = '', params: object = {}, data: any = {}, isFullPath: boolean = false) {
    const url = process.env[`${api}${name}`];
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    return this.service
      .request({
        'method': 'POST',
        'url': fullPath,
        'params': params,
        'data': data
      })
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error, 'POST'));
  }

  put(name: string = 'core', path: string = '', params: object = {}, data: any = {}, isFullPath: boolean = false) {
    const url = process.env[`${api}${name}`];
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    return this.service
      .request({
        'method': 'PUT',
        'url': fullPath,
        'params': params,
        'data': data
      })
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error, 'PUT'));
  }

  delete(name: string = 'core', path: string = '', params: object = {}, data: any = {}, isFullPath: boolean = false) {
    const url = process.env[`${api}${name}`];
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    return this.service
      .request({
        'method': 'DELETE',
        'url': fullPath,
        'params': params,
        'data': data
      })
      .then((response) => handleResponse(response))
      .catch((error) => handleError(error, 'DELETE'));
  }
}
