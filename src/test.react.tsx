import { spawn } from 'child_process';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { ObserverDOM } from './browser/DOM/event/ObserverDOM';
import { ScrollState } from './browser/scroll/listen-scroll';
import WX from '@/wx/index'
import axios from 'axios';
import { createArrow as arrow } from '@/browser/css/create-arrow';

const arrowStyle = arrow(20, 20, 'bottom');

const TestObserverDOM = () => {
  const [data, updata] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 123, 123, 431, 534, 6, 56, 7, 67, 8, 7869, 23, 456, 689, 2134, 214, 213, 42, 34, 56, 5, 67, 78, 1, 23, 12,])
  const [data_sub, updat2] = useState<number[]>([]);
  const target = useRef<HTMLElement>();
  const add = () => {
    updata((_data) => ([..._data, 1]))
    updat2((_data) => ([..._data, 10]))
  }

  const refcb = (node: any) => {
    if (node) {
      target.current = node;
      const obs = new ObserverDOM(node, { childList: true, subtree: true })
      obs.keepScrollBottom()
    }
  }
  useEffect(() => {
    const ss = new ScrollState(document.documentElement);
    ss.onChangeState((state) => {
      console.log(state);
    })
  }, [])
  useEffect(() => {
    axios.get(`/xthirdparty-toolkit-web/wechat/jssdk/config/17?signatureUrl=${encodeURIComponent(
      window.location.href,
    )}`).then((data: any) => {
      debugger
      const wx = new WX({
        debug: true,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['onMenuShareAppMessage'],
        openTagList: ['wx-open-launch-app']
      })
      debugger
      wx.initConfig().then(() => {
        wx.addOpenApp(target.current!, 'iting://open', {
          succes: () => {
            console.log('成功');
          }, fail: (e: any) => {
            console.log(e);
          }
        }).catch((err) => {
          debugger
        })
      }).catch((err: any) => {
        debugger
      });



    })



  }, [])
  return (<div ref={refcb}
  //  style={{ maxHeight: '60px', overflow: 'auto' }}
  >
    <div style={arrowStyle}></div>
    {
      data.map((val) => {
        return <div key={val}>{val}
          {data_sub.map((sub_val) => (<span key={sub_val}>{sub_val}</span>))}
        </div>
      })
    }
  </div >)
}

ReactDOM.render(<TestObserverDOM />, document.getElementById('app'));
