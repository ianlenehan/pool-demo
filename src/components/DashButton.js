import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faCheckDouble } from '@fortawesome/free-solid-svg-icons'

class DashButton extends Component {
  render() {
    console.log('props', this.props.option);
    return (
      <div>
        <p>{this.props.option.name}</p>
        <FontAwesomeIcon icon={this.props.option.icon} />
      </div>
    )
  }
}

export default DashButton
