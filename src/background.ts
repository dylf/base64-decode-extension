import { isUrl, decode } from '@/utils'

const COPY_TO_CLIPBOARD_MENU_ID = 'COPY_TO_CLIPBOARD'
const OPEN_URL_MENU_ID = 'OPEN_URL'

/**
 * Add an event listener for responding to the 'updateContextMenu' message.
 */
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.request !== 'updateContextMenu') {
    return
  }
  chrome.contextMenus.removeAll()
  const [isBase64, decoded] = decode(msg.selection)
  if (msg.selection === '' || !isBase64) return

  chrome.contextMenus.create({
    id: COPY_TO_CLIPBOARD_MENU_ID,
    title: `Copy ${decoded} to clipboard`,
    contexts: ['selection'],
  })

  if (isUrl(decoded)) {
    chrome.contextMenus.create({
      id: OPEN_URL_MENU_ID,
      title: `Go to ${decoded}`,
      contexts: ['selection'],
    })
  }
})

/**
 * Listener for the custom context menu item clicks.
 */
chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  if (clickData.selectionText == null) return
  const [, decoded] = decode(clickData.selectionText)
  if (clickData.menuItemId === OPEN_URL_MENU_ID) {
    chrome.tabs.create({ url: decoded })
  }
  if (clickData.menuItemId === COPY_TO_CLIPBOARD_MENU_ID && tab != null) {
    console.log('Selected ' + decoded + ' in ' + tab.url)
    chrome.tabs.sendMessage(
      tab.id!,
      {
        message: 'copyDecoded',
        decoded: decoded,
      },
      (response) => console.log(response)
    )
  }
})
