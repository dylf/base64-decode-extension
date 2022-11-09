import { isPossibleBase64, isUrl, decode } from '@/utils'

interface ContextMenuItem {
  id: string
  title: string
  enabled: boolean
}

/**
 * The decode context menu item.
 */
const decodeMenuItem = {
  id: 'base-64-decode-decode-selection',
  title: 'Base 64 Decode',
  enabled: false,
}

/**
 * The open url context menu item.
 */
const openUrlMenuItem = {
  id: 'base-64-decode-open-url',
  title: 'Open Base 64 Decoded URL',
  enabled: false,
}

/**
 * Add an event listener for responding to the 'updateContextMenu' message.
 */
chrome.extension.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.request !== 'updateContextMenu') {
    return
  }
  if (msg.selection === '' || !isPossibleBase64(msg.selection)) {
    removeMenuItem(decodeMenuItem)
    removeMenuItem(openUrlMenuItem)
    return
  }
  if (isUrl(decode(msg.selection))) {
    createOrUpdateMenuItem(openUrlMenuItem)
    removeMenuItem(decodeMenuItem)
    return
  }
  createOrUpdateMenuItem(decodeMenuItem)
  removeMenuItem(openUrlMenuItem)
})

/**
 * Remove a context menu item.
 */
function removeMenuItem(menuItem: ContextMenuItem) {
  chrome.contextMenus.remove(menuItem.id)
  menuItem.enabled = false
}

/**
 * Create or update a context menu item
 */
function createOrUpdateMenuItem(menuItem: ContextMenuItem) {
  let options = {
    id: menuItem,
    title: menuItem.title,
    contexts: ['selection'],
  }

  if (menuItem.enabled) {
    chrome.contextMenus.update(menuItem.id, options)
    return
  }

  chrome.contextMenus.create({ ..options, ...{ id: menuItem.id } })
  menuItem.enabled = true
}

/**
 * Open a new tab given a destintation url.
 *
 * @param {string} destination
 */
function openNewTab(destination: string) {
  chrome.tabs.create({ url: destination })
}

/**
 * Listener for the custom context menu item clicks.
 */
chrome.contextMenus.onClicked.addListener((clickData, tab) => {
  if (clickData.selectionText == null) return
  if (clickData.menuItemId === openUrlMenuItem.id) {
    openNewTab(decode(clickData.selectionText))
  }
  if (clickData.menuItemId === decodeMenuItem.id && tab != null) {
    alert('Selected ' + decode(clickData.selectionText) + ' in ' + tab.url)
  }
})
