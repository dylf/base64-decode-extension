/**
 * Send a message 'updateContextMenu' when a selection changes.
 */
document.addEventListener('selectionchange', () => {
  const selected = window.getSelection()?.toString().trim() ?? ''
  if (selected.length)
    chrome.runtime.sendMessage({
      request: 'updateContextMenu',
      selection: selected,
    })
})

/**
 * Listen to context copy to clipboard menu click.
 */
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'copyDecoded') copyToTheClipboard(request.decoded)
})

/**
 * Copy the base 64 decoded text.
 *
 * @param decoded The decoded text.
 */
async function copyToTheClipboard(decoded: string) {
  const el = document.createElement('textarea')
  el.value = decoded
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
