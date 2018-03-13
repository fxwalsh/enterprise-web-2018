import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Link, IndexRoute, Route, browserHistory } from 'react-router';
import './css/custom.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

var About = React.createClass({  

  render: function() {
    return (
      <div>
        <h1>About page</h1>
      </div>
    );
  } 
  }) ;

var Inbox = React.createClass({  
  render: function() {
    return (
      <div>
        <h1>Inbox page</h1>
        {this.props.children}
      </div>
    );
  } 
  }) ;

var Message = React.createClass({
  render : function() {
    return <h3>Message for user: {this.props.params.id} </h3>
  }
});

var InboxStats = React.createClass({
  render : function() {
    return <h3>Stats</h3>
  }
});

var Header = React.createClass({
  render : function() {
    return (
      <div className="navbar navbar-fixed-top navbar-inverse" >
            <div className="container">
              <Link to="/" id="logo" >React Router Demo</Link>
              <nav>
                  <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                  </ul>
              </nav>
            </div>
          </div>
      );
  }
});

var Footer = React.createClass({
  render : function() {
    return (
      <footer className="footer">
          <small>
            Built with <a href="https://facebook.github.io/react/">ReactJS </a>
            by <a href="https://github.com/diarmuidoconnor">Diarmuid O Connor</a>
          </small>
          <nav>
            <ul>
               <li><Link to="/about">About</Link></li>
               <li><Link to="/inbox">Inbox</Link></li>
               <li><a href="http://news.railstutorial.org/">News</a></li>
            </ul>
          </nav>
        </footer>
      ) ;
  }
});

var App = React.createClass({
  render : function() {
    return (
      <div>
        <Header />
        <div className="container">
        {this.props.children}
      </div>
      <Footer />
      </div>
    )
  }
});

ReactDOM.render((
  <Router history={browserHistory} >
    <Route path="/" component={App}>
      <Route path="about" component={About} />
      <Route path="inbox" component={Inbox} >
           <IndexRoute component={InboxStats}/>
           <Route path="messages/:id" component={Message} />
      </Route>
    </Route>
    
  </Router>
), document.getElementById('root')) ;

