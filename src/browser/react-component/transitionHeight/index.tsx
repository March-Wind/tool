import React, { FC } from 'react';
import getCSSValue from '@/browser/DOM/cssValue';
/**
 * 高度渐变组件，适用于更多按钮
 * @date 2022-03-03
 * @param {any} props
 * @returns {any}
 */
const TransitionHeight: FC<{}> = (props) => {
  return (
    <div
      style={{ transition: 'height 0.3s' }}
      ref={(node) => {
        if (node) {
          const { height } = node.getBoundingClientRect();
          const contentHeight = node.scrollHeight;
          node.style.height = height + 'px';
          if (height !== contentHeight) {
            const value = getCSSValue(node, 'overflow');
            node.style.overflow = 'hidden';
            node.style.height = contentHeight + 'px';
            setTimeout(() => {
              node.style.overflow = value;
            }, 300);
          }
        }
      }}
    >
      {props.children}
    </div>
  );
};
export default TransitionHeight;
