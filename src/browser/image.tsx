import React, { FC, useState } from 'react';

// 当前浏览器是否支持webp
export let isSupportWebP = () => {
  try {
    const flag =
      document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0;
    isSupportWebP = () => flag;
    return flag;
  } catch (err) {
    return false;
  }
};
// let isPictureSupported = () =>  {
//   const flag =  'HTMLPictureElement' in window;
//   isPictureSupported = () => flag;
//   return flag;

// }
// function getImageTypeFromURL(url:string) {
//   const urlObj = new URL(url);
//   const path = urlObj.pathname;
//   // 定义正则表达式匹配常见的图片文件扩展名
//   const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i;

//   // 从URL中提取文件名部分
//   const fileName = path.split('/').pop();
//   if(!fileName){
//     return
//   }
//   // 使用正则表达式匹配文件名是否属于图片类型
//   const match = fileName.match(imageRegex);

//   if (match) {
//     return match[1].toLowerCase();
//   } else {
//     return; // 如果链接不以支持的图片格式结尾，则返回
//   }
// }
interface Props {
  origin: string;
  webP: string;
  className?: string;
  style?: React.CSSProperties;
}
const Image: FC<Props> = (props) => {
  const { origin, webP, ...rest } = props;
  const [url, setUrl] = useState(webP);
  const onError = () => {
    setUrl(origin);
  };

  if (!isSupportWebP()) {
    return <img {...rest} src={origin} alt="" />;
  }

  return <img {...rest} src={url} alt="" onError={onError} />;

  // const type = getImageTypeFromURL(origin);
  // return (
  //   <picture>
  //     {webP ?<source srcSet={webP} type="image/webp" />: null}
  //     {type === 'png' ? <source srcSet={origin} type="image/png" />: null}
  //     {type === 'jpg' ? <source srcSet={origin} type="image/jpeg" />: null}
  //     <img src={origin} alt="" />
  //   </picture>
  // )
};

export default Image;
