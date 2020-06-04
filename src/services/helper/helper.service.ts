import {
  get, filter, findIndex, cloneDeep, includes, difference, differenceBy,
  intersection, intersectionBy, map, uniq, forEach, find, extend, sortBy,
  every, some, sum, uniqBy, sumBy, remove, isEmpty, groupBy, flatten, orderBy,
  flow, chain
} from 'lodash';
import {
  toJson, toString, isEmail, isNotEmpty, isEmptyObject, generateCode,
  getCookie, setCookie, deleteCookie, readJwtToken, cleanDataRemoveNull, filterData,
  setExpiryTime, createSecretKey, createJwtToken, isInArray, generateRandomString,
  addHttps, encode, decode
} from 'jnpl-helper';

export class Helper {
  env: string = process.env.NODE_ENV;

  get randomColor(): string {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
  }

  get(data: any, value: string = '', defaultValue: any = ''): any {
    return get(data, value, defaultValue);
  }

  filter(data: any, func: any): any {
    return filter(data, func);
  }

  findIndex(collection: any, func: any): any {
    return findIndex(collection, func);
  }

  cloneDeep(value: any): any {
    return cloneDeep(value);
  }

  includes(...value: any): any {
    return includes(...value);
  }

  difference(...value: any): any {
    return difference(...value);
  }

  differenceBy(...value: any): any {
    return differenceBy(...value);
  }

  intersection(...value: any): any {
    return intersection(...value);
  }

  intersectionBy(...value: any): any {
    return intersectionBy(...value);
  }

  map(...value: any): any {
    return map(...value);
  }

  uniq(...value: any): any {
    return uniq(...value);
  }

  forEach(...value: any): any {
    return forEach(...value);
  }

  find(...value: any): any {
    return find(...value);
  }

  extend(...value: any): any {
    return extend(...value);
  }

  sortBy(...value: any): any {
    return sortBy(...value);
  }

  every(...value: any): any {
    return every(...value);
  }

  some(...value: any): any {
    return some(...value);
  }

  sum(value: Array<any>): any {
    return sum(value);
  }

  uniqBy(...value: any): any {
    return uniqBy(...value);
  }

  sumBy(...value: any): any {
    return sumBy(...value);
  }

  remove(...value: any): any {
    return sumBy(...value);
  }

  isEmpty(value: any): any {
    return isEmpty(value);
  }

  groupBy(...value: any): any {
    return groupBy(...value);
  }

  flatten(value: any): any {
    return flatten(value);
  }

  orderBy(...value: any): any {
    return orderBy(...value);
  }

  flow(...value: any): any {
    return flow(...value);
  }

  chain(value: any) {
    return chain(value);
  }

  toJson(jsonData: any = ''): any {
    return toJson(jsonData);
  }

  toString(jsonData: any = ''): any {
    return toString(jsonData);
  }

  isNotEmpty(v: any = null): boolean {
    return isNotEmpty(v);
  }

  isUndefined(v: any = null) {
    v = (v) ? (typeof(v) === 'string') ? v.toLowerCase() : v : null;

    return v == null || v === 'n/a' || v === '' || v === 'no' || v === 0 || v === 'undefined' || v === 'nan' || v === 'na' || v === ' ' || v === 'false' || v === 'null';
  }

  isInArray(value: any, array: Array<any>): boolean {
    return isInArray(value, array);
  }

  isEmptyObject(obj: Object = {}): boolean {
    return isEmptyObject(obj);
  }

  getDomain() {
    return (process.env.NODE_ENV === 'development') ? '' : process.env.VUE_APP_DOMAIN;
  }

  setCookie(name: string = '', value: any = '', domain: string = '', exdays: number = 5): boolean {
    if (this.isUndefined(domain)) {
      domain = this.getDomain();
    }

    return setCookie(name, value, domain, exdays);
  }

  getCookie(name: string = ''): string {
    return getCookie(name);
  }

  deleteCookie(name: string = '', domain: string = ''): string {
    return deleteCookie(name, domain);
  }

  isValidToken(name: string = ''): boolean {
    const cookie: string = this.getCookie(name);
    const cookieData: Object = (cookie) ? decode(process.env.VUE_APP_SECRET_KEY_HASH || '', cookie).split('|') : {};

    return !isEmptyObject(cookieData);
  }

  cleanDataRemoveNull(data: any): any {
    return cleanDataRemoveNull(data);
  }

  encode(data): string {
    return Buffer.from(data).toString('base64');
  }

  decode(data): string {
    return Buffer.from(data, 'base64').toString('ascii');
  }

  // add zero on the start of one digit numbers
  pad(number: number): string {
    return (number < 10) ? '0' + number : number.toString();
  }

  toggleTheme(element, className) {
    if (!element || !className) {
      return;
    }

    let classString = element.className;
    const nameIndex = classString.indexOf(className);

    if (classString !== '') {
      const classIndex = classString.indexOf(classString);
      classString = classString.substr(0, classIndex) + classString.substr(classIndex + classString.length);
    }

    nameIndex === -1
      ? classString += '' + className
      : classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    element.className = classString;
  }

  printThousandDecimal(number: any): any {
    return parseFloat(parseFloat(number).toFixed(2)).toLocaleString();
  }

  isEmptyString(str: string) {
    return this.isUndefined(str) || !str.replace(/\s/g, '').length;
  }

  getFilterQuery(filters) {
    const query: string[] = [];

    if (filters.length >= 1) {
      const localFilter: object = filters.reduce((finalFltr, fltr) => {
        if (!fltr['exactValue'] && fltr['key'] && fltr['value']) {
          finalFltr[fltr['key']] = finalFltr[fltr['key']]
            ? `${finalFltr[fltr['key']]},${fltr['value']}`
            : finalFltr[fltr['key']] = fltr['value'];
        }
        return finalFltr;
      }, {});

      for (const key in localFilter) {
        if (localFilter.hasOwnProperty(key)) {
          query.push(`${key}:${localFilter[key]}`);
        }
      }
    }

    return query.join('|');
  }

  getExactFilterQuery(filters) {
    const query: string[] = [];

    if (filters.length >= 1) {
      const localFilter: object = filters.reduce((finalFltr, fltr) => {
        if (fltr['exactValue'] && fltr['key'] && fltr['value']) {
          finalFltr[fltr['key']] = finalFltr[fltr['key']]
            ? `${finalFltr[fltr['key']]},${fltr['value']}`
            : finalFltr[fltr['key']] = fltr['value'];
        }
        return finalFltr;
      }, {});

      for (const key in localFilter) {
        if (localFilter.hasOwnProperty(key)) {
          query.push(`${key}:${localFilter[key]}`);
        }
      }
    }

    return query.join('|');
  }

  debounce(func?, wait?, immediate?) {
    let timeout, args, context, timestamp, result;

    const later = () => {
      const last = +new Date() - timestamp;

      if (last < wait && last > 0) {
        timeout = setTimeout(later, wait - last);
      } else {
        timeout = null;

        if (!immediate) {
          result = func.apply(context, args);

          if (!timeout) {
            context = args = null;
          }
        }
      }
    };

    return (...argmnts) => {
      context = this;
      timestamp = +new Date();
      const callNow = immediate && !timeout;

      if (!timeout) {
        timeout = setTimeout(later, wait);
      }

      if (callNow) {
        result = func.apply(context, argmnts);
        context = argmnts = null;
      }

      return result;
    };
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomDate(start, end) {
    return new Date(+start + Math.random() * (end - start));
  }

  generateRandomSerial() {
    const chars = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const serialLength = 10;
    let randomSerial = '';

    for (let i = 0; i < serialLength; i = i + 1) {
      const randomNumber = Math.floor(Math.random() * chars.length);
      randomSerial += chars.substring(randomNumber, randomNumber + 1);
    }

    return randomSerial;
  }

  getRandomArrayEl(arr, n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    if (n > len) {
      throw new RangeError('getRandomArrayEl: more elements taken than available');
    }

    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  }
}
