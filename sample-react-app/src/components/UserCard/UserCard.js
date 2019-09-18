import React from 'react';

import Todos from '../Todos/Todos';

import './UserCard.css';
export default class UserCard extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      currentTab: 'info'
    };
  }

  setCurrentTab (newTab) {
    this.setState({currentTab: newTab});
  }

  loadTweets () {
    this.props.onTweetsRequested();
  }

  render () {
    return (
      <div className="user-card card">
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <a className={`nav-link ${this.state.currentTab === 'info' ? 'active': ''}`} href="#" onClick={() => { this.setCurrentTab('info'); }}>User Info</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.currentTab === 'tweets' ? 'active': ''}`} href="#" onClick={() => { this.setCurrentTab('tweets'); }}>User Tweets</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${this.state.currentTab === 'todos' ? 'active': ''}`} href="#" onClick={() => { this.setCurrentTab('todos'); }}>User Todos</a>
            </li>
          </ul>
        </div>

        { this.state.currentTab === 'info' && (
          <div className="card-body">
            <h5 className="card-title"><strong>Name:</strong> { this.props.user.firstName } { this.props.user.lastName }</h5>
            <h5 className="card-title"><strong>Profession:</strong> { this.props.user.profession }</h5>
            <h5 className="card-title"><strong>Blurb:</strong> { this.props.user.blurb }</h5>
          </div>
        )}

        { this.state.currentTab === 'todos' && (
          <div className="card-body">
            <h5 className="card-title">Todos</h5>
            <Todos/>
          </div>
        )}

        { this.state.currentTab === 'tweets' && (
          <div className="card-body">
            <h5 className="card-title">User Tweets</h5>

            <button className="btn btn-outline-primary btn-block" onClick={() => { this.loadTweets(); }}>
              { this.props.user.tweetsLoading && (
                <i className="fa fa-spinner fa-spin mr-2"></i>
              )}

              { this.props.user.tweets === false && (
                <span>Load Tweets</span>
              )}

              { this.props.user.tweets !== false && (
                <span>Reload Tweets</span>
              )}
            </button>

            { this.props.user.tweetsError && !this.props.user.tweetsLoading && (
              <div class="alert alert-danger mt-2" role="alert">
                Uh oh, something went wrong. Try loading tweets again.
              </div>
            )}

            { this.props.user.tweets !== false && !this.props.user.tweetsLoading && (
              <div>
                  {
                    this.props.user.tweets.map((tweetEmbed, tweetIndex) => {
                      return (<div className="tweet-embed mt-2" key={tweetIndex} dangerouslySetInnerHTML={{__html: tweetEmbed}} />);
                    })
                  }
              </div>
            )}
          </div>
        )}

      </div>
    );
  }
}