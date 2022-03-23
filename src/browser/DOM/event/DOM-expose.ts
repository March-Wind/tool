import supportPassive from './passive-supported';
interface Options {
  nested?: boolean; // 嵌套的滚动监听
  once?: boolean; // 一次
}
const expose = (dom: Element, cb?: Function, options: Options) => {
  const _options: Options = {
    nested: false,
    once: true,
  };
  const handle = () => {
    const position = dom.getBoundingClientRect();
    if (position.y > 0 && position.y < window.innerHeight) {
      if (_options.once) {
        window.removeEventListener('scroll', handle, supportPassive() ? { capture: true } : true);
      }
      cb && cb();
    }
  };
  window.addEventListener('scroll', handle, supportPassive() ? { passive: true, capture: true } : true);
};

export default expose;
