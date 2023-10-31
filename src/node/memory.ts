// 当前程序的内存限制,以及已使用的内存，以及剩余内存
const memory = () => {
  const { heapTotal, heapUsed } = process.memoryUsage();
  const used = Math.round(heapUsed / 1024 / 1024);
  const total = Math.round(heapTotal / 1024 / 1024);
  const remaining = total - used;
  return { total, used, remaining };
}
export {
  memory
}
