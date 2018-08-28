import React, { Component } from 'react'
import { observer } from 'mobx-react'
import { Link } from 'router-link'
import LogoutButton from './LogoutButton'
import store from '@/store.js'
import './Navigation.css'

@observer class Navigation extends Component {
  render() {
    let button
    if (store.isLoggedIn) {
      button = <LogoutButton/>
    } else {
      button = <Link to="/login">Login</Link>
    }
    return (
      <nav className="Navigation">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        { button }
      </nav>
    )
  }
}

export default Navigation
