import React from 'react';

class HeaderSearch extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      selectedNav: '',
    }
    this.onNavChange= this.onNavChange.bind(this);
    this.onSearch= this.onSearch.bind(this);
  }  
  onNavChange( nav ) {
    if ( nav === this.state.selectedNav ) {
      this.setState( { selectedNav: ''} );
    } else {
      this.setState( {selectedNav: nav} );
    }
  }
  onSearch() {  
    this.props.history.push( '/global-search' );
  }
  render() {
    const { selectedNav } = this.state;
    return (
      <div className="col-md-5 dash-serach">
        <a href="#" id="search"><i className="ion-ios-search" onClick={() => this.onNavChange( 'search' )}></i></a>
        <div className="serch" id="search-menu" style={{display: selectedNav === 'search' ? 'block' : 'none'}}>
          <div className="container">
            <div className="serch-app">Search This App <i className="ion-ios-arrow-down"></i></div>
            <input type="search" placeholder="Search" onClick={this.onSearch()}/>
            <a href="#"><i className="ion-ios-search"></i></a>
          </div>
        </div>
      </div>
    );
  }
}
export default HeaderSearch;
