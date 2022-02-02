//复制到剪切板
export function copypasteboard(text: string) {
  if (!document) return;
  if (navigator.clipboard) { // 新api用来替代document.execCommand('Copy');
    navigator.clipboard.writeText(text).catch(function (err) {
      throw (err !== undefined ? err : new DOMException('The request is not allowed', 'NotAllowedError'))
    })
    return;
  }

  const isSupported = document.queryCommandSupported && document.queryCommandSupported("copy");
  if (isSupported) { // 此处不推荐使用了，随时可以删除特性
    const input = document.createElement('input');
    input.id = 'copy_input';
    input.style.opacity = '0';
    input.style.position = 'absolute';
    input.style.top = '-100px';
    input.setAttribute('readonly', 'readonly');
    input.setAttribute('value', text);
    document.body.appendChild(input);
    input.select();
    input.setSelectionRange(0, input.value.length)
    document.execCommand('Copy');
    document.body.removeChild(input);
  }
}
console.log(222);
