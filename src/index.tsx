import { copypasteboard } from './businessFunction/copypasteboard'
import React from 'react'
import ReactDOM from 'react-dom'
/**
 * 加法
 * @param num1 
 * @param num2 
 * @returns 
 */
const sum = (num1: number, num2: number) => {
  return num1 + num2;
}
// test
// if (true) {
//   console.log(111);
// } else {
//   console.log(2222);
// }
export {
  sum
}
console.log(11112);
const App = () => {

  const onclick = () => copypasteboard('nihao');
  return <div onClick={onclick}>copy</div>
}
ReactDOM.render(<App />, document.getElementById('app'))