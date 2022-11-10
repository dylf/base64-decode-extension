import { test, expect } from 'vitest'

/**
 * Determine if a string may be base 64 encoded.
 *
 * @param {string} str
 */
export function isPossibleBase64(str: string): boolean {
  return /(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/.test(
    str
  )
}

/**
 * Check if a string may be a URL.
 *
 * @param {string} str
 */
export function isUrl(str: string): boolean {
  let regex =
    /^(((H|h)(T|t)(T|t)(P|p)(S|s)?):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,100}\.[a-zA-Z]{2,10}(\/([-a-zA-Z0-9@:%_\+.~#?&//=]*))?/
  return regex.test(str)
}

/**
 * Base 64 decode a string.
 *
 * @param {string} str
 */
export function decode(str: string): string {
  return Buffer.from(str, 'base64').toString()
}

if (import.meta.vitest) {
  test('decodes correctly', () => {
    const googleUrl = 'aHR0cHM6Ly9nb29nbGUuY29t'
    expect(decode(googleUrl)).toBe('https://google.com')

    const teststring = 'dGVzdHN0cmluZw=='
    expect(decode(teststring)).toBe('teststring')

    const garbage = 'garbage'
    expect(decode(garbage)).not.toBe('garbage')
  })

  test('it can identify an encoded url', () => {
    const googleUrl = 'aHR0cHM6Ly9nb29nbGUuY29t'
    expect(isUrl(decode(googleUrl))).toBe(true)

    const stackOverflow = 'http://www.stackoverflow.com/?good_question'
    const encoded = Buffer.from(stackOverflow).toString('base64')
    expect(decode(encoded)).toBe(stackOverflow)
    expect(isUrl(decode(encoded))).toBe(true)
  })

  test('the base64 regex works', () => {
    expect(isPossibleBase64('@VGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZw==')).toBe(true)
    expect(isPossibleBase64('@FGHD0==')).toBe(true)
    expect(isPossibleBase64('@to=')).toBe(false)
    expect(isPossibleBase64('https://google.ca')).toBe(false)
    expect(isPossibleBase64('')).toBe(false)
    expect(isPossibleBase64(' ')).toBe(false)
  })
}
