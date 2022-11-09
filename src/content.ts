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
