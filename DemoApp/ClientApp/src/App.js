import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader/root'
// import routes from './routes'
import Routes from './routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './components/Login'


import Home from './components/Home'
import InvMove from './components/InvMove'
import InvSearch from './components/InvSearch'
import InvTrans from './components/InvTrans'

const App = ({ history }) => {
 
    return (
      <ConnectedRouter history={history}>
        {/* { routes } */}
        <Routes >
          
          <Route exact path="/" component={Home} />
          <Route path="/imove" component={InvMove} />
          <Route path="/isearch" component={InvSearch} />
          <Route path="/itrans" component={InvTrans} />
          <Route path="/login" component={Login} />
        </Routes>
        <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick={false}
              rtl={false}
              className='toast-container'
              toastClassName="dark-toast"
              pauseOnVisibilityChange
              draggable
              pauseOnHover
            />
      </ConnectedRouter>
    )
}



const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


App.propTypes = {
  history: PropTypes.object,
}

export default hot(App)