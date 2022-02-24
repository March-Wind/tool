import throttle from '../../tools/optimization-function/throttle'
// 到达底部判断
const reachTheBottom = (shim = 100) => {
  let lastScrollTop = 0;
  return () => {
    const contentHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
    const pageHeight = document.body.clientHeight || document.documentElement.clientHeight;
    const scrollDistance = document.body.scrollTop || document.documentElement.scrollTop;
    const dwon = lastScrollTop < scrollDistance
    if (contentHeight <= pageHeight + scrollDistance + shim && dwon) {
      lastScrollTop = scrollDistance;
      return true;
    } else {
      lastScrollTop = scrollDistance;
      return false;
    }
  }

}

/**
 * 监听到达元素或者window底部,返回移除函数
 *
 * @param {(Element | Window)} [dom=window]
 * @param {Function} cb
 * @param {number} [shim=100] 距离shim就算到达
 * @return {*}
 */
const listenReachTheBottom = (dom: Element | Window = window, cb: Function, shim = 100) => {
  const ireachTheBottom = reachTheBottom(shim);
  const handle = throttle((event: Event) => {
    if (ireachTheBottom()) {
      if (cb) { cb(event) }
    }
  }, 50)
  dom.addEventListener('scroll', handle)
  return function removeAddEventListen() {
    dom.removeEventListener('scroll', handle)
  }
}

export {
  listenReachTheBottom
}
