import React, { Component } from 'react'
import { store, observer, autorun } from '@/store.js'
import { router } from 'router-link'
import './Chat.css'
import util from '@/lib/util.js'

// https://images.pexels.com/photos/34950/pexels-photo.jpg

@observer class Chat extends Component {
  constructor (props) {
    super(props)
    if (!store.isLoggedIn) {
      router.push('/login')
    }
    this.input = React.createRef()
    store.connect()

    autorun(() => {
      if(store.isConnected) {
        this.focus()
      }
    })
  }

  focus = () => {
    window.requestAnimationFrame(() => {
      const input = this.input.current
      if (input) {
        input.focus()
      }
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const input = this.input.current
    if (input.value.length > 0) {
      let data = JSON.stringify({
        text: input.value,
        name: store.username,
        color: store.usercolor
      })
      store.socket.send(data)
      input.value = ''
    } else {
      input.focus()
    }
  }

  componentDidMount() {
    this.focus()
  }

  render () {
    if(!store.isConnected){
      return <p>Connecting!</p>
    }
    return (
      <div className="Chat">
        <div className="Chat-input">
          <form onSubmit={ this.handleSubmit }>
            <input type="text" placeholder="Write a message..." ref={ this.input }/>
          </form>
        </div>
        <ul className="Chat-list">
          { store.messages.map((m) => {
            return <li className="Chat-message" key={ Math.random() }>
                <div className="Chat-message-content">
                  <span style={{ color: m.color }}>{ m.name }: </span>
                   <span dangerouslySetInnerHTML={{ __html: m.text }}></span>
                </div>
                <div className="Chat-message-date">{ util.formatDate(m.date) }</div>
            </li>
          }) }
        </ul>
      </div>
    )
  }
}

export default Chat
