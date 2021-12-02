
import React, { Component } from 'react'

import './style.sass';

export default class Main extends Component {
  constructor(props){
    super(props)
    this.state = {
      actualPreview: 'about:blank',
    }
  }
  render() {
    const {defaultLink, plugin, fieldValue, previewLinks, fieldName, prefix} = this.props;

    const handleChangePreview = (content) => {
      //console.log("Local", content)
      this.setState({actualPreview: content}, () => {
        //console.log("Local", content)
      })
    }
    const prefixJSON = JSON.parse(prefix)
    return (
      <div className="preview-container">
        {
          this.state.actualPreview &&
          <>
          <select onChange={e => handleChangePreview(e.target.value)}>
            <option selected disabled>Select your locale</option>
            {JSON.parse(previewLinks).map(content => {
              return(<option value={`${content.link}/${prefixJSON[content.locale] !== undefined ? (prefixJSON[content.locale] + "/") : ""}${plugin.getFieldValue(fieldName, content.locale)}`}>{content.locale}</option>)
            })})
            <option value={`${defaultLink}/${prefixJSON["default"] !== undefined ? (prefixJSON["default"] + "/") : ""}${typeof plugin.getFieldValue(fieldName) !== 'object' ? plugin.getFieldValue(fieldName) : ''}`}>No Locale</option>
          </select>
          <a href={`${this.state.actualPreview}`} target="_blank">Open Preview</a>
          </>

        }
      </div>
    )
  }
}
