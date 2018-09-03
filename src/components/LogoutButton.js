import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link, router } from 'router-link'
import store from '@/store.js'
import util from '@/lib/util.js'
import './LogoutButton.css'

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
    let klass = 'LogoutButton-notification'
    if (store.notifications === 0) {
      klass += ' gray'
    }

    return (
      <React.Fragment>
        <Link to="/chat">Chat</Link>
        <div className="Navigation-login-status">
          <label style={{ display: util.isSafari() ? 'none' : '' }}>
            <input onChange={ this.handleCheck } type="checkbox" checked={ store.playSound }></input> 🔔
          </label>
          <span className="LogoutButton-userName" style={{color: store.usercolor}}>
            { store.isLoggedIn ? `( ${store.username} )` : '' }
          </span>
          <span className={ klass }>{store.notifications}</span>
          <a href="/logout" className="Navigation-logout" onClick={ this.handleClick }>Logout</a>
        </div>
      </React.Fragment>
    )
  }
}

export default LogoutButton
