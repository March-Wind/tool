type SystemName = 'Windows' | 'Macos' | 'IOS' | 'Android';
enum SystemNameMap {
  Windows = 'windows|win32|win64|wow32|wow64',
  Macos = 'macintosh|macintel|OS X [d._]+',
  Android = 'Android|Adr',
  IOS = 'ios|iphone|ipad|ipod|iwatch|OS X [d._]+',
}

const UA = navigator.userAgent;

type SystemNameResult = SystemName | boolean | undefined;
/**
 * 系统名
 * @param systemNameS
 * @param userAgent
 */
const systemName = (systemNameS?: SystemName, userAgent?: string): SystemNameResult => {
  const usedUA = userAgent ? userAgent : UA;
  if (systemNameS) {
    return new RegExp(SystemNameMap[systemNameS]).test(usedUA);
  } else {
    const systemNameArr: SystemName[] = ['Windows', 'Macos', 'IOS', 'Android'];
    return systemNameArr.find((system) => new RegExp(SystemNameMap[system]).test(usedUA));
  }
};
export { systemName };
