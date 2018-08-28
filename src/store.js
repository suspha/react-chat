import { observable } from 'mobx'
import soundfile from '@/assets/pling.mp3'

const names = 'Susana,Peter,Vidar,Sean,Eva,Lars'.split(',')
const name = names[Math.floor(Math.random() * names.length)];

const colors ='red,green,magenta,purple,pink,orange'.split(',')
const color = colors[Math.floor(Math.random() * colors.length)];

class Store {
  @observable username = name
  @observable usercolor = color
  @observable isLoggedIn = true
  @observable playSound = true
  @observable messages = [
    // {
    //   text: '<img src="https://images.pexels.com/photos/34950/pexels-photo.jpg"/>',
    //   name: 'Susana',
    //   color: 'red',
    //   date: new Date()
    // },
    // {
    //   text: 'Dette er en test nummer 2, Dette er en test nummer 2,Dette er en test nummer 2m, Dette er en test nummer 2,Dette er en test nummer 2',
    //   name: 'Peter',
    //   color: 'green',
    //   date: new Date()
    // }
  ]
  @observable isConnected = false

  connect(){
    if(!this.isConnected) {
      this.socket = new WebSocket ('ws://localhost:5000')
      this.socket.onopen = (e) => {
        console.log('Websocket is open')
        setTimeout(() => {
          this.isConnected = true
        }, 1000)
      }
      this.socket.onmessage = (e) => {
        console.log("Websocket message receieved:", e.data)
        const data = JSON.parse(e.data)
        data.date = new Date()

        // Check if text matches image
        const regex = /(https?:\/\/.+(jpg|png|gif|jpeg|eps|giff|bmp))/ig
        const images = data.text.match(regex) || []
        console.log(images)
        for (const i of images) {
          data.text = data.text.replace(i, `<img src='${i}'/>`)
        }

        this.messages.unshift(data)

        // Play sound
        if(this.playSound) {
          let sound = new Audio(soundfile)
          sound.play()
        }
      }
    }
  }
}

// Exports
export const store = new Store()
export default store
export { observable, computed, action } from 'mobx'
export { observer } from 'mobx-react'

