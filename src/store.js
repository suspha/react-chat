import { observable } from 'mobx'
import soundfile from '@/assets/pling.mp3'
import util from '@/lib/util.js'

const names = 'Susana,Peter,Vidar,Sean,Eva,Lars'.split(',')
const name = names[Math.floor(Math.random() * names.length)];

const colors ='red,green,magenta,purple,pink,orange'.split(',')
const color = colors[Math.floor(Math.random() * colors.length)];

class Store {
  @observable username = name
  @observable usercolor = color
  @observable isLoggedIn = true
  @observable playSound = true
  @observable messages = []
  @observable isConnected = false
  @observable notifications = 0

  connect () {
    if(!this.isConnected) {
      this.socket = new WebSocket ('ws://localhost:5000')
      this.socket.onopen = (e) => {
        console.log('Websocket is open')
        setTimeout(() => {
          this.isConnected = true
        }, 100)
      }
      this.socket.onmessage = (e) => {
        console.log("Websocket message receieved:", e.data)
        const data = JSON.parse(e.data)
        data.date = new Date()

        if (window.location.pathname !== '/chat'){
          this.notifications++
        }

        util.convertImages(data)
        util.emoji(data)
        this.messages.unshift(data)

        // Play sound
        if(this.playSound) {
          let sound = new Audio(soundfile)
          sound.autoplay = true
          if (!util.isSafari()) {
            sound.play()
          }
        }
      }
    }
  }
}

// Exports
export const store = new Store()
export default store
export { observable, computed, action, autorun } from 'mobx'
export { observer } from 'mobx-react'

