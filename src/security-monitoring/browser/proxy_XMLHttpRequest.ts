import EventEmitter from "../../tools/eventEmitter";
type ApiErrorType = 'api-error' | 'api-timeout' | 'api-abort';
type CBType = {
  [k in ApiErrorType]: any;
}
interface CB extends CBType {
  "api-error": (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
  "api-timeout": (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
  "api-abort": (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
}
/**
 * 代理XMLHttpRequest的
 *
 * @class Proxy_XMLHttpRequest
 */
class Proxy_XMLHttpRequest extends EventEmitter<CB> {
  instance: XMLHttpRequest;
  constructor() {
    super();
    this.create();
    // to do types
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // return this.instance;
  }
  create() {
    const origin_XMLHttpRequest = window.XMLHttpRequest;
    // to do types
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.XMLHttpRequest = Proxy_XMLHttpRequest;
    this.instance = new origin_XMLHttpRequest();
    this.instance.addEventListener('error', (ev) => {
      debugger
      this.emit('api-error', ev)
    })
    this.instance.addEventListener('timeout', (ev) => {
      debugger
      this.emit('api-timeout', ev)
    })
    this.instance.addEventListener('abort', (ev) => {
      debugger
      this.emit('api-abort', ev)
    })
  }

}
export default Proxy_XMLHttpRequest;
