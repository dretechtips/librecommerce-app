import React, { Component } from 'react'

export class Nav extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom border-success">
        <a href="#" className="navbar-brand">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/a/af/Medicine_Hat_Tigers_Logo.svg/1200px-Medicine_Hat_Tigers_Logo.svg.png" width="40" alt="Logo"/>
        </a>
        <button className="navbar-toggler" data-toggle="collapse" data-target="navbarPanel">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarPanel">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <img src="https://via.placeholder.com/40x40" alt="Admin Image" className="rounded-circle mr-2"/>
                John Doe
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav
