// 堆栈相关


/**
 *
 * 获取调用函数的上一个函数信息，可以设置lastStorey来获取祖父级别等等函数信息
 * 
 * @param {number} [lastStorey=1] 倒数的层级，从1开始
 * @return {*} 
 */
function getCallerInfo(lastStorey  = 1) {
  const _lasteStorey = lastStorey - 1;
  const error = new Error()
  const stack  = error.stack!.split('\n').slice(3); // 去掉前面几行的 Error 和 getCallerInfo 函数调用
  const caller = stack[_lasteStorey].match(/at\s+(.*)\s+\((.*):(\d+):(\d+)\)/) || stack[_lasteStorey].match(/at\s+(.*):(\d+):(\d+)/); // 尝试使用包含括号和不包含括号的正则表达式提取信息
  if (!caller) {
    return null;
  }
  const [, functionName, fileName, lineNumber, columnNumber] = caller;
  return {
    functionName,
    fileName,
    line: parseInt(lineNumber),
    column: parseInt(columnNumber),
  };
}


export function getCallerPath(lastStorey  = 2) {
  return (getCallerInfo(lastStorey) || {}).fileName;
}

// 将


/**
 * 
 * 
: 
"    at getCurrentFilePath (file:///Users/xmly/Documents/shadow/opencv/src/utils/utils.ts:31:15)"
1
: 
"    at file:///Users/xmly/Documents/shadow/opencv/src/index.ts:5:19"
2
: 
"    at ModuleJob.run (node:internal/modules/esm/module_job:198:25)"
3
: 
"    at async Promise.all (index 0)"
4
: 
"    at async ESMLoader.import (node:internal/modules/esm/loader:409:24)"
5
: 
"    at async loadESM (node:internal/process/esm_loader:85:5)"
6
: 
"    at async handleMainPromise (node:internal/modules/run_main:61:12)"
 */