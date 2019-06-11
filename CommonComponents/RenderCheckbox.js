import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_index_checkbox.scss';

class Checkbox extends Component {
  static propTypes = {
    input: PropTypes.object,
    label: PropTypes.string,
    options: PropTypes.array,
  }
  checkboxGroup() {
    let { label, options, input } = this.props;
    return options.map( ( option, index ) => {
      return (
        <div className="checkbox" key={index}>
            <input type="checkbox"
              name={`${input.name}[${index}]`}
              value={option}
              checked={input.value.indexOf( option ) !== -1}
              onChange={( event ) => {
                let newValue = [ ...input.value ];
                if ( event.target.checked ) {
                  newValue.push( option );
                } else {
                  newValue.splice( newValue.indexOf( option ), 1 );
                }

                return input.onChange( newValue );
              }} />
            <label> {option} </label>
        </div> )
    } );
  }

  render() {
    const {
      input,
      label,
    } = this.props;

  return (   

    <div className="multiselect">      
       <div className="multiselect_data">
         {this.checkboxGroup()}       
       </div>
     </div>
  );
}
}

export default Checkbox;

    {/*<div className="multiselect">{label}
      <input
        {...input}
        className="mr2"
        type="checkbox"
        checked={input.value}
      />
      {this.checkboxGroup()}
      <span className="checkmark"></span>
    </div>*/}