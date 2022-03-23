import supportPassive from './passive-supported';
const expose = (dom: Element, cb?: Function, nested = false) => {
  const handle = () => {
    const position = dom.getBoundingClientRect();
    if (position.y > 0 && position.y < window.innerHeight) {
      cb && cb();
    }
  };
  window.addEventListener('scroll', handle, supportPassive() ? { passive: true, capture: true } : true);
};

export default expose;
