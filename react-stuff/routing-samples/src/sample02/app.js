import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, Route, browserHistory } from 'react-router';

var About = React.createClass({  
  render: function() {
    return (
      <div>
        <h2>About page</h2>
      </div>
    );
  } 
  }) ;

var Inbox = React.createClass({  
  render: function() {
    return (
      <div>
        <h2>Inbox page</h2>
      </div>
    );
  } 
  }) ;

var App = React.createClass({
  render : function() {
    return (
       <div>
          <h1>App</h1>
          <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/inbox">Inbox</Link></li>
          </ul>
           {this.props.children}
        </div>
    )
  }
});

ReactDOM.render((
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} />
    </Route>
  </Router>
), document.getElementById('root')) ;

