import React from 'react';
import ReactDOM from 'react-dom';
import PhoneCatalogueApp from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import PhoneDetail from './phoneDetail';

class App extends React.Component {
      render() {
        return (
          <div>
            <h1>Phone Catalogue </h1>
            {this.props.children}
          </div>
        )
      }
};

ReactDOM.render( 
          <Router history={browserHistory} >
            <Route path="/" component={App}>
               <IndexRoute component={PhoneCatalogueApp}/>
               <Route path="phones/:id" component={PhoneDetail} />
            </Route>
          </Router>
        ,
  document.getElementById('root')
);
