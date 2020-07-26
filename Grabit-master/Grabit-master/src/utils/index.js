export function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/
  return !regex.test(email)
}

export function validatePhone(phone) {
  const regex = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/g
  return !regex.test(phone)
}

export function validateCost(cost) {
  const regex = /\$?([0-9]){1,}\s?-?\s?\$?([0-9]){1,}?/g
  return !regex.test(cost)
}

export function validateText(text) {
  const regex = /^$/
  return regex.test(text)
}
