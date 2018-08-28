import React, { Component } from 'react'
import { store, observer } from '@/store.js'
import { router } from 'router-link'
import './Chat.css'

// https://images.pexels.com/photos/34950/pexels-photo.jpg

@observer class Chat extends Component {
  constructor (props) {
    super(props)
    if (!store.isLoggedIn) {
      router.push('/login')
    }
    this.input = React.createRef()
    store.connect()
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

  formatDate = (date) => {
    const dd = date.getDay()
    const mm = date.getMonth()+1
    const yy = date.getFullYear()
    const hour = date.getHours()
    const min = date.getMinutes()
    return hour + ':' + min + ' ' + dd + '/' + mm + '/' + yy
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
                <div className="Chat-message-date">{ this.formatDate(m.date) }</div>
                <span><i className="material-icons">mode_edit</i></span>
            </li>
          }) }
        </ul>
      </div>
    )
  }
}

export default Chat
