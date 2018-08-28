import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link, router } from 'router-link'
import store from '@/store.js'

@observer class LogoutButton extends Component {

  handleCheck(event) {
    console.log('checked')
    store.playSound = !store.playSound
  }

  handleClick(event) {
    event.preventDefault()
    router.push('/login')
    store.isLoggedIn = false
    store.isConnected = false
    if(store.socket){
      store.socket.close()
    }
  }

  render() {
    return (
      <React.Fragment>
        <Link to="/chat">Chat</Link>
        <div className="Navigation-login-status">
        <span>
          <input onChange={ this.handleCheck } type="checkbox" checked={ store.playSound }></input><span>Sound</span>
        </span>
          <span className="userName" style={{color: store.usercolor}}>{ store.isLoggedIn ? `( ${store.username} )` : '' }</span>
          <a href="/logout" className="Navigation-logout" onClick={ this.handleClick }>Logout</a>
        </div>
      </React.Fragment>
    )
  }
}

export default LogoutButton
