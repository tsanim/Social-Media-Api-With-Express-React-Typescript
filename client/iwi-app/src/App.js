import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

import Header from './components/App/common/Header/Header';
import Footer from './components/App/common/Footer/Footer';
import Home from './components/App/Home/Home';
import UserProfile from './components/App/UserProfile/UserProfile';
import Discover from './components/App/Discover/Discover';
import EditUserInfo from './components/App/Edit/EditUserInfo';
import NotFound from './components/App/NotFound/NotFound';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';
import Me from './components/App/MyProfile/MyProfile';
import Chat from './components/App/Chat/Chat';

import { wrapComponent } from 'react-snackbar-alert';
import { Offline } from "react-detect-offline";

import { logout, loginUser } from './store/actions/authActions/actionsCreator';
import { setCurrentUser } from './services/authService'
import { resetPosts } from './store/actions/postsAtions/actionsCreator';
import { online, offline } from './store/actions/connectionStatusActions/actionsCreator';
import SearchPosts from './components/App/SearchPosts/SearchPosts';

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Header
          user={this.props.currentUser.toJS()}
          signoutHandler={() => {
            this.props.signout();
            this.props.resetUserPosts();
          }}
          switchToOffline={this.props.switchToOffline}
          switchToOnline={this.props.switchToOnline}
          notifications={this.props.currentUser.get('notifications') ? this.props.currentUser.get('notifications').toJS() : null}
        />
        <Offline>
          <p className="warning">No internet connection!</p>
        </Offline>
        <Switch>
          <Route path="/" exact render={() => localStorage.getItem('username') ? <Home /> : <LoginForm />} />
          <Route path="/profile/:userId" {...this.props} render={(props) => localStorage.getItem('username') ? <UserProfile {...props} /> : <LoginForm />} />
          <Route path="/MyProfile" render={() => localStorage.getItem('username') ? <Me /> : <LoginForm />} />
          <Route path="/chat" {...this.props} render={(props) => localStorage.getItem('username') ? <Chat {...props} /> : <LoginForm />} />
          <Route path="/discover" render={() => localStorage.getItem('username') ? <Discover /> : <LoginForm />} />
          <Route path="/edit" render={() => localStorage.getItem('username') ? <EditUserInfo /> : <LoginForm />} />
          <Route path="/searchPosts" render={() => localStorage.getItem('username') ? <SearchPosts /> : <LoginForm />} />
          <Route path="/signin" render={() => localStorage.getItem('username') ? <Home /> : <LoginForm />} />
          <Route path="/signup" render={() => localStorage.getItem('username') ? <Home /> : <RegisterForm />} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (!localStorage.getItem('userId') || !this.props.connectionStatus) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    if (!window.navigator.onLine) {
      this.props.createSnackbar({
        message: 'Oops! Something went wrong with loading data! Please check your network connection.',
        timeout: 3000,
      })

      clearInterval(this.timer);
    }

    if (localStorage.getItem('userId') && this.props.connectionStatus) {
      this.timer = setInterval(() => {
        this.props.setCurrentUser(localStorage.getItem('userId'));
      }, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.systemReducer.get('currentUser'),
    errors: state.errors,
    connectionStatus: state.systemReducer.get('connectionStatus')
  }
}

function mapDispatchToProps(dispatch) {
  return {
    signout: () => dispatch(logout()),
    resetUserPosts: () => dispatch(resetPosts()),
    switchToOnline: () => dispatch(online()),
    switchToOffline: () => dispatch(offline()),
    loginUser: (user) => dispatch(loginUser(user)),
    setCurrentUser: (userId) => dispatch(setCurrentUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrapComponent(App));
