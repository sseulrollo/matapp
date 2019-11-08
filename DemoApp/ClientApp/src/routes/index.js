import React, { Component } from 'react'
import HeaderBar from '../components/HeaderBar'
import BottomNav from '../components/BottomNav'
import {Visibility, Button } from 'semantic-ui-react'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../store/HandlePage';

class Routes extends Component {

  state = {
    menuFixed: false,
    overlayFixed: false,
    intervalId: 0,
    navi: 'Prototype'
  }

  constructor(props) {
    super(props)

    console.log(this)
    
    this.scrollToTop = this.scrollToTop.bind(this)
  }

  scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(this.state.intervalId);
    }
    window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
  }
  
  scrollToTop() {
    let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
    this.setState({ intervalId: intervalId });
  }

  stickTopMenu = () => this.props.fixMenu(); //this.setState({ menuFixed: true })
  unStickTopMenu = () => this.props.unFixMenu(); //this.setState({ menuFixed: false })

  routeChange = (value) => this.setState({navi: value})

  render() {
    // const { menuFixed} = this.state
    const {children, menuFixed} = this.props
    
    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <HeaderBar props={this.props} menuFixed={menuFixed} route={this.state.navi}/>
        </Visibility>
        <div >
          {children}
        </div>
        {menuFixed ? <div
          style={{position:'fixed', padding:'0em',  margin:'0em', bottom:'5em', right:'0.5em', 
                  border:'none'}}>
          <Button icon='arrow up' size="medium" circular onClick={this.scrollToTop} />
        </div> : <div></div>}
        
        <footer  
          style={{
              position: 'fixed', margin: '0em', bottom: '0em', left: '0',
              border: 'none', backgroundColor: 'white', padding: '0em', width: '100%'
          }}>          
          <BottomNav props={this.props} routeChange={this.routeChange} />
        </footer>
      </div>
    )
  }
}


// export default Routes

export default connect(
  state => state.pages,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Routes);