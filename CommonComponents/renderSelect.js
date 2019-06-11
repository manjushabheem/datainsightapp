
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class renderSelect extends Component {
  static propTypes = {
    input:PropTypes.object,
    label:PropTypes.string,
    meta:PropTypes.object,
    children:PropTypes.array,
  }
  render(){
    const {
      input,
      meta: { touched, error },
      children,
      label,
    } = this.props;
    return (
      <div>
        {touched && error ?
            // <span className="error">
            //   {error}
            // </span>
            <select 
            title={label} 
            className="error" 
            autoComplete="off" 
            {...input}
          >
            {children}
           </select>
            :
            <select 
        title={label} 
        className="" 
        autoComplete="off" 
        {...input}
      >
        {children}
       </select>
        }
       
        
      </div>
    )
  }
}

export default renderSelect;
