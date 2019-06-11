import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form'
import PropTypes from 'prop-types';
import Utils from '../_shared/_utils';
import renderField from '../CommonComponents/RenderField';
import './_index.scss';


class LoginFrom extends Component {
  constructor (props) {
    super (props);
    this.state = {
    }
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    submitting: PropTypes.bool,
  };
 
  handleSubmit (values) {
    let reqBody = {
      username: values.username,
      pass: values.password,
    };

    let loginValues = reqBody;
    //let jsonLoginValues = { 'json': JSON.stringify( loginValues ) }
    //console.log('loginValues', loginValues);   
    fetch( `${Utils.getApiBaseUrl( )}/authenticate`,
      Utils.getPostOptions( loginValues ),
    ).then( ( response ) => {
      return response.json( );
    } ).then( ( data ) => {      
      if ( data.isSuccess ) {
        Utils.setLocalStorage( 'isLogin', true );
        Utils.setLocalStorage( 'ldapid', data.userid );
        Utils.setLocalStorage( 'fullname', data.fullname );
        //Utils.setLocalStorage( 'userrole', data.userrole );
        this.props.history.push( '/' );
      } else {
        this.setState( {error: 'Invalid Username and Password combination'} );
      }
    } );
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    //const { userName, pass, error } = this.state;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} encType="multipart/form-data" className="form-login">
        <div className="form-inner">
          <Field
            name="username"
            placeholder="Username"
            type="text"
            component={renderField}
          />
          <Field
            name="password"
            placeholder="Password"
            type="password"
            component={renderField}           
          />
          <div>
            <button 
              className="login-new" 
              type="submit" 
              disabled={pristine | submitting}>
              Log In
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('LoginForms'));

export default reduxForm({
  form: 'LoginForms', //a unique identifier for this form
  onSubmitSuccess: afterSubmit,
})(LoginFrom);