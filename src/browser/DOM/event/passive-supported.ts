declare interface WindowEventMap {
  _supportPassive: any;
}
let supportPassive = (): boolean => {
  let passiveSupported = false;

  try {
    const options = Object.defineProperty({}, 'passive', {
      get: function () {
        passiveSupported = true;
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    window.addEventListener('_supportPassive' as keyof WindowEventMap, () => {}, options);
  } catch (err) {
    console.log(err);
  }
  supportPassive = () => passiveSupported;
  return passiveSupported;
};

export default supportPassive;
