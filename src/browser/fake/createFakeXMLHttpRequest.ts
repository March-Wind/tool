// type FakeXMLHttpRequest = XMLHttpRequest;
// const createFakeXMLHttpRequest = (XMLHttpRequest: XMLHttpRequest) => {
//   Object.getOwnPropertyNames(XMLHttpRequest)
//     .filter((p) => {
//       const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest, p);
//       return !descriptor?.configurable;
//     }).forEach((p) => {
//       const descriptor = Object.getOwnPropertyDescriptor(XMLHttpRequest, p);
//       if (descriptor) {
//         const hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');
//       }
//       Object.defineProperty(fakeWindow, p, Object.freeze(descriptor));



//     })
// }
