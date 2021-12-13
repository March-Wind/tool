//复制到剪切板
export function execCommand(info: string) {
  if (!document) return;
  const copyInput = document.querySelector('#copy-input');
  copyInput && document.body.removeChild(copyInput);
  const input = document.createElement('input');
  input.id = 'copy-input';
  input.style.opacity = '0';
  input.style.position = 'absolute';
  input.style.top = '-100px';
  input.setAttribute('readonly', 'readonly');
  input.setAttribute('value', info);
  // input.value = info;
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length)
  document.execCommand('Copy');
  document.body.removeChild(input);
  // select(input)
}