import { isObject, isString } from '../../tools/variable-type';

// 缓存类型
enum CacheTypes {
  // 内存
  MEMORY = 'memory',
  // session
  SESSION = 'sessionStorage',
  // local
  LOCAL = 'localStorage',
}

interface Memory {
  [key: string]: any;
}

interface PutArg {
  key: string;
  value: string | object;
  cacheType: CacheTypes;
  expirationDate?: number;
}
// 内存缓存对象
const memory: Memory = {};

const seperator = '&putTime=';
const Base = {
  addEndTime(jsonString = '', cacheType: CacheTypes, expirationDate?: number) {
    if (cacheType !== CacheTypes.LOCAL || !expirationDate) {
      return jsonString;
    }
    return `${jsonString + seperator + Date.now()}&${expirationDate}`;
  },
  removeTime(jsonString: string, cacheType: CacheTypes, key: string) {
    if (!jsonString) {
      return;
    }
    if (cacheType !== CacheTypes.LOCAL) {
      return jsonString;
    }
    // 对jsonString进行分割，如 {name:"xxx"}&1470897909359&1470897919359
    // 匹配后结果的2、3、4项对应 value、存储时间的ms值、需缓存的时间ms
    const result = jsonString.match(new RegExp(`(.*)${seperator}(\\d+)&(\\d+)$`)) || [];
    const putDate = Number(result[2]);
    const expirationDate = Number(result[3]);
    if (!putDate) {
      return jsonString;
    }
    // 有失效时间，判断失效时间
    if (Date.now() <= expirationDate) {
      return result[1];
    }
    // 失效删除
    this.remove(key, cacheType);
  },
  put({ key, value, cacheType, expirationDate }: PutArg) {
    let resultValue = '';
    if (isObject(value)) {
      resultValue = JSON.stringify(value);
    }
    resultValue = this.addEndTime(resultValue, cacheType, expirationDate);
    if (cacheType !== CacheTypes.MEMORY) {
      window[cacheType].setItem(key, resultValue);
    } else {
      memory[key] = resultValue;
    }
  },
  get<T = string>(key: string, cacheType: CacheTypes): Partial<T> | null {
    let resultValue;
    if (cacheType !== CacheTypes.MEMORY) {
      window[cacheType].getItem(key);
    } else {
      resultValue = memory[key];
    }
    resultValue = this.removeTime(resultValue, cacheType, key);
    if (resultValue) {
      try {
        if (isString(resultValue)) {
          resultValue = JSON.parse(resultValue);
        }
      } catch (e) {
        console.error(`${cacheType}中的${key}值无法parse`);
      }
    }
    return resultValue;
  },
  remove(key: string, cacheType: CacheTypes) {
    if (cacheType !== CacheTypes.MEMORY) {
      window[cacheType].removeItem(key);
    } else {
      delete memory[key];
    }
    return true;
  },
};

const cache = {
  /*
   * 内存缓存接口
   * */
  memory: {
    put: (key: string, value: string | object) => {
      Base.put({ key, value, cacheType: CacheTypes.MEMORY });
    },
    get: <T>(key: string) => Base.get<T>(key, CacheTypes.MEMORY),
    remove: (key: string) => Base.remove(key, CacheTypes.MEMORY),
  },
  local: {
    put: (key: string, value: string | object, expirationDate?: number) => {
      Base.put({ key, value, cacheType: CacheTypes.LOCAL, expirationDate });
    },
    get: <T = string>(key: string) => Base.get<T>(key, CacheTypes.LOCAL),
    remove: (key: string) => Base.remove(key, CacheTypes.LOCAL),
  },
  session: {
    put: (key: string, value: string | object) => {
      Base.put({ key, value, cacheType: CacheTypes.SESSION });
    },
    get: <T = string>(key: string) => Base.get<T>(key, CacheTypes.SESSION),
    remove: (key: string) => Base.remove(key, CacheTypes.SESSION),
  },
};
export { cache };
