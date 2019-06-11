import React from 'react';

export default class Link extends React.PureComponent {
  constructor() {
    super();  
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    return <a {...this.props} target="_blank" onClick={this.handleClick}/>
  }

  handleClick(e) {
    console.log('handleClick:', this.props.children);  
    this.props.onClick(this.props.children);
    //e.preventDefault();
    //console.log(this.props.href);
  }
}
