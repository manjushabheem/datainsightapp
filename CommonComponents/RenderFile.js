import React, { Component } from 'react'
import PropTypes from 'prop-types';

class renderField extends Component {

  constructor ( props ) {
    super( props )
    this.state = {
      value:'',
      error:'',
    }
    this.handleChange= this.handleChange.bind(this);
  }

  static propTypes = {
    input:PropTypes.object,
    placeholder:PropTypes.string,
    readonly:PropTypes.bool,
    type:PropTypes.string,
    meta:PropTypes.object,
    disabled:PropTypes.bool,
    className:PropTypes.string,  
    onFileChange: PropTypes.func,
    filter: PropTypes.string,
  }

  componentDidMount() {       
    this.setState( { value: ''} );
  }

  handleChange = (e) => {
    
    const extesion = e.target.files[0].name.split('.');
    
    if ( this.props.filter === 'pdf' ) {
      if ( extesion[1] === 'pdf' ) {
        this.setState( {
          value: e.target.files[0].name,
          error: '',
        } );
        this.props.onFileChange(e.target.name, e.target.files[0], this.props.filter)
      } else {
        this.setState( { 
          value: e.target.files[0].name+' Please upload pdf file',
          error: 'error',
        } );
        this.props.onFileChange('disable')
      }
    } else {

      this.setState({
        value: e.target.files[0].name,
      });
      this.props.onFileChange(e.target.name, e.target.files[0], '')
      
    }

	}

  render(){
    const {
      input,
      //name,
      placeholder,
      readonly,
      type,
      filter,
      meta: { touched, error },
      //disabled
      className,      
    } = this.props;
    //console.log('value', this.state.value);   
    return (
      <div>
        <input 
          className={className} 
          {...input} 
          placeholder={placeholder} 
          type={type} 
          readOnly={readonly} 
          onChange={this.handleChange} 
          value=""
        />
        <label className={this.state.error ? this.state.error : null} htmlFor="file-7">
          <span>
            {this.state.value ? this.state.value : null}
          </span> 
          <i className="icon ion-arrow-up-b"></i>
        </label> 
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
