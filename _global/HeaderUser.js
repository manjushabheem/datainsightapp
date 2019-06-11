import React from 'react';
import PropTypes from 'prop-types';
import Utils from '../_shared/_utils';
import NavSearch from '../Navigation/NavSearch';
//import createHistory from 'history/createBrowserHistory'
//const history = createHistory()
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class HeaderUser extends React.Component {
  constructor ( props ) {
    super ( props );
    this.state = {
      selectedNav: '',
      login: '',
      usersettingmenu: false,
      isLogin: null,
    }
    this.onNavChange = this.onNavChange.bind( this );
    this.onLogout = this.onLogout.bind( this );
    
  }
  static propTypes = {
    login: PropTypes.object.isRequired,
    setCreateSuccess: PropTypes.func,
    history: PropTypes.object.isRequired,
  };
  onLogout() {
    Utils.eraseLocalStorage('isLogin');
    Utils.eraseLocalStorage('ldapid');
    Utils.eraseLocalStorage('fullname');
    //console.log(this.props);   
    this.props.history.push( '/login' );
  }
  onNavChange( nav ) {
    if ( nav === this.state.selectedNav ) {
      this.setState( { selectedNav: ''} );
    } else {
      this.setState( {selectedNav: nav} );
    }
  }
  componentDidMount() {
    if ( Utils.getLocalStorage( 'isLogin' ) === null ) {
      this.setState( { isLogin: null, fullname: '', initial: '' } );
    } else {
       let fl = Utils.getLocalStorage( 'fullname' ).split( ' ' )
      let userinit = fl[ 0 ].charAt( 0 ) + fl[ 1 ].charAt( 0 );
      this.setState( { isLogin: Utils.getLocalStorage( 'isLogin' ), initial: userinit, fullname: Utils.getLocalStorage( 'fullname' ) } );
      //console.log('ldapid', Utils.getLocalStorage( 'ldapid' ));
    }
  }
  /*componentDidUpdate(prevProps) {
    if ( Utils.getLocalStorage( 'isLogin' ) === null ) {
      this.setState( { isLogin: null, fullname: '', initial: '' } );
    } else {
       let fl = Utils.getLocalStorage( 'fullname' ).split( ' ' )
      let userinit = fl[ 0 ].charAt( 0 ) + fl[ 1 ].charAt( 0 );
      this.setState( { isLogin: Utils.getLocalStorage( 'isLogin' ), initial: userinit, fullname: Utils.getLocalStorage( 'fullname' ) } );
      //console.log('ldapid', Utils.getLocalStorage( 'ldapid' ));
    }
  }*/
 
  render() {
    const { isLoggedIn } = this.props;
    const { fullname, initial, isLogin } = this.state;    
    return (
        <div className="col-md-4 user-avatar pull-right">
          { isLogin ? <NavSearch history={this.props.history}/> : '' }
          <div className="usersetting">
          { isLogin ? <a href="#" id="notify" className="notify"><i className="icon ion-ios-bell"></i></a> : ''}
            { isLogin ?
            <div id="user-acc" onClick={() => this.onNavChange( 'user-acc' )}><span>{initial}</span>
              <Dropdown isOpen={this.state.usersettingmenu}
                toggle={ () => {
                  this.setState( {
                    usersettingmenu: !this.state.usersettingmenu,
                  } );
                }
                }>
                <DropdownToggle caret>
                  <i className="ion-ios-arrow-down"></i>
                </DropdownToggle>
                <DropdownMenu className="dropmenu">
                  <DropdownItem disabled>{fullname}</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Manage Account</DropdownItem>
                  <DropdownItem>Setting</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={this.onLogout}>Logout</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              </div>
            : ''}
          </div>
      </div>
    );
  }
}
HeaderUser.propTypes = {
    onLogOut: PropTypes.func,
    isLoggedIn: PropTypes.string,
};
export default HeaderUser;
