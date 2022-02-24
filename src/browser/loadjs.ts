const loadJs = (url: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.onload = () => {
      document.querySelector('body')?.removeChild(script);
      resolve()
    }
    script.onerror = () => {
      reject()
    }
    script.src = url;
    document.querySelector('body')?.appendChild(script);
  })
}
export {
  loadJs
}
