// class EventTargetShim {
//   private registry: Record<string, Function[]> = {}
//   /**
//    * @param {string} type
//    * @param {EventListener|function(!Event):(boolean|undefined)} listener
//    * @param {(boolean|!AddEventListenerOptions)=} opts
//    * @return {undefined}
//    * @see https://dom.spec.whatwg.org/#dom-eventtarget-addeventlistener
//    */
//   addEventListener(type:string, listener: EventListener, opts = false) {
//     if(!(type in this.registry)){
//       this.registry[type] = [];
//     }
//     this.registry[type].push(listener);
//   }

//   /**
//    * @param {string} type
//    * @param {EventListener|function(!Event):(boolean|undefined)} listener
//    * @param {(boolean|!EventListenerOptions)=} opts
//    * @return {undefined}
//    * @see https://dom.spec.whatwg.org/#dom-eventtarget-removeeventlistener
//    */
//   removeEventListener(type:string, listener:EventListener, opts = false):void {
//     if(!(type in this.registry)){
//       return;
//     }
//     const stack = this.registry[type];
//     for(let i = 0, l = stack.length; i < l; i++) {
//       if(stack[i] === listener){
//         stack.splice(i, 1);
//         return this.removeEventListener(type, listener);
//       }
//     }
//   }

//   /**
//    * @param {!Event|!EventShim} event
//    * @return {boolean}
//    * @see https://dom.spec.whatwg.org/#dom-eventtarget-dispatchevent
//    */
//   dispatchEvent(event:Event) {
//     if(!(event.type in this.registry)) {
//       return;
//     }
//     const stack = this.registry[event.type];
//     for(let i = 0, l = stack.length; i < l; i++) {
//       stack[i].call(this, event);
//     }
//   }
// }
// export default EventTargetShim;