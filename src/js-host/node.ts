const isNode = () => {
  return typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]';
};
export { isNode };
