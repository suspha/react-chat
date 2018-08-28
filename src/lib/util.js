const util = {}

util.formatDate = (date) => {
  const dd = date.getDay()
  const mm = date.getMonth()+1
  const yy = date.getFullYear()
  const hour = date.getHours()
  const min = date.getMinutes()
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
    ':/': '😕',
  }
  for(const e in emojis) {
    data.text = data.text.replace(e, emojis[e])
  }
}

export default util
