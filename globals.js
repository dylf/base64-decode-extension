
/**
 * Determine if a string may be base 64 encoded.
 * 
 * @param {string} str
 */
function stringIsValidBase64(str)  {
    return  /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(str)
}

/**
 * Check if a string may be a URL.
 * 
 * @param {string} str
 */
function isUrl(str) {
    let regex =/^(((H|h)(T|t)(T|t)(P|p)(S|s)?):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,100}\.[a-zA-Z]{2,10}(\/([-a-zA-Z0-9@:%_\+.~#?&//=]*))?/
    return regex.test(str)
}

/**
 * Base 64 decode a string.
 * 
 * @param {string} str 
 */
function decode(str) {
    return atob(str)
}