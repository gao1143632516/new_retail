import _cookie from 'js-cookie'

const cookie_key = 'sessionkey'

export function getSessionkey() {
  return _cookie.get(cookie_key)
}

export function setSessionkey(sessionkey) {
  return _cookie.set(cookie_key, sessionkey)
}

export function removeSessionkey() {
  return _cookie.remove(cookie_key)
}
