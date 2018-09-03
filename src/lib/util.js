const util = {}

util.formatDate = (date) => {
  const dd = date.getDay()
  const mm = date.getMonth()+1
  const yy = date.getFullYear()
  const hour = date.getHours()
  let min = date.getMinutes()
  // Add 0 when min is less than 2 digits
  if (String(min).length < 2) {
    min = '0' + min
  }
  return hour + ':' + min + ' ' + dd + '/' + mm + '/' + yy
}

  // Check if text matches image
util.convertImages = (data) => {
  const regex = /(https?:\/\/.+(jpg|png|gif|jpeg|eps|giff|bmp))/ig
  const images = data.text.match(regex) || []
  for (const i of images) {
    data.text = data.text.replace(i, `<img src='${i}'/>`)
  }
}

util.emoji = (data) => {
  const emojis = {
    ':)': '😃',
    ':(': '😞',
    ';)': '😉',
    '<3': '❤️',
    '</3': '💔',
    ':/': '😕',
    '/^' : '👍',
    '^/' : '👎',
    ':|': '😐',
    ':0': '😱',
    ':-0': '😱'
  }

  for(const e in emojis) {
    data.text = data.text.replace(e, emojis[e])
  }
}

util.isSafari = () => {
  return !!window.safari
}

export default util
