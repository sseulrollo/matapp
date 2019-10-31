import React, { Component } from 'react'
import HeaderBar from '../components/HeaderBar'
import BottomNav from '../components/BottomNav'
import {Visibility, Button} from 'semantic-ui-react'


class Routes extends Component {

  state = {
    menuFixed: false,
    overlayFixed: false,
    intervalId: 0
  }

  constructor(props) {
    super(props)
    
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

  stickTopMenu = () => this.setState({ menuFixed: true })
  unStickTopMenu = () => this.setState({ menuFixed: false })

  render() {
    const { menuFixed} = this.state
    const {children} = this.props
    
    return (
      <div>
        <Visibility
          onBottomPassed={this.stickTopMenu}
          onBottomVisible={this.unStickTopMenu}
          once={false}
        >
          <HeaderBar props={this.props} menuFixed={menuFixed}/>
        </Visibility>
        {children}
        <div
          style={{position:'fixed', padding:'0em',  margin:'0em', bottom:'5em', right:'0.5em', 
                  border:'none'}}>
          <Button icon='arrow up' size="medium" circular onClick={this.scrollToTop} />
        </div>
        <footer  
          style={{
              position: 'fixed', margin: '0em', bottom: '0em', left: '0',
              border: 'none', backgroundColor: 'white', padding: '0em', width: '100%'
          }}>          
          <BottomNav props={this.props} />
        </footer>
      </div>
    )
  }
}


export default Routes