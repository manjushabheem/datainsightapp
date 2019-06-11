import React, { Component } from 'react'
import PropTypes from 'prop-types';

class renderField extends Component {

  constructor ( props ) {
    super( props )
    this.state = {
      value:'',
    }
  }

  static propTypes = {
    input:PropTypes.object,
    placeholder:PropTypes.string,
    readonly:PropTypes.bool,
    type:PropTypes.string,
    meta:PropTypes.object,
    disabled:PropTypes.bool,
    className:PropTypes.string,
  }

  render(){
    const {
      input,
      //name,
      placeholder,
      readonly,
      type,
      meta: { touched, error },
      //disabled
      className,
    } = this.props;
    return (
      <div>
        <input className={className} {...input} placeholder={placeholder} type={type} readOnly={readonly}/>
        {/* write css for the Error Span */}
        {touched && error ?
            <span className="error">
              {error}
            </span>
            :
            null
        }
      </div>
    )
  }
}

export default renderField;
