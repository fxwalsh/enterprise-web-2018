import React from 'react';
import './App.css'
import _ from 'lodash';
import Phones from  './Data';
import { Link } from 'react-router'; 

class SelectBox extends React.Component {
  handleChange = (e, type, value) => {
      e.preventDefault();
      this.props.onUserInput( type,value);
  };

  handleTextChange = (e) => {
      this.handleChange( e, 'search', e.target.value);
  };

  handleSortChange = (e) => {
      this.handleChange(e, 'sort', e.target.value);
  };

  render() {
      return (
          <div className="col-md-10">
              <input type="text" placeholder="Search" 
                  value={this.props.filterText}
                  onChange={this.handleTextChange} />
       Sort by:
              <select id="sort" value={this.props.order } 
                  onChange={this.handleSortChange} >
                  <option value="name">Alphabetical</option>
                  <option value="age">Newest</option>
              </select>
          </div>
      );
  }
}


class PhoneItem extends React.Component {
    render() {
       let url = process.env.PUBLIC_URL + '/phoneSpecs/' + this.props.phone.imageUrl;
       return (
          <li className="thumbnail phone-listing">
                <Link to={'/phones/' + this.props.phone.id} className="thumb">
                     <img src={"/phoneSpecs/" + this.props.phone.imageUrl} 
                      alt={this.props.phone.name} /> </Link>
                <Link to={'/phones/' + this.props.phone.id}> {this.props.phone.name}</Link>
             <p>{this.props.phone.snippet}</p>
          </li>
        ) ;
     }
}

class FilteredPhoneList extends React.Component {
  render() {
      var displayedPhones = this.props.phones.map(function(phone) {
        return <PhoneItem key={phone.id} phone={phone } /> ;
      }) ;
      return (
              <div className="col-md-10">
                <ul className="phones">
                    {displayedPhones}
                </ul>
              </div>
        ) ;
  }
}

class PhoneCatalogueApp extends React.Component {
    state = { search: '', sort: 'name' };
     handleChange = (type, value) => {
          if ( type === 'search' ) {
              this.setState( { search: value } ) ;
          } else {
              this.setState( { sort: value } ) ;
          }
      };

      render() {
         let list = Phones.filter( (p) => {
            return p.name.toLowerCase().search(
                this.state.search.toLowerCase() ) !== -1 ;
        } );
        let filteredList = _.sortBy(list, this.state.sort) ;
         return (
            <div className="view-container">
            <div className="view-frame">
               <div className="container-fluid">
                 <div className="row">
                    <SelectBox onUserInput={this.handleChange } 
                           filterText={this.state.search} 
                           sort={this.state.sort} />
                     <FilteredPhoneList phones={filteredList} />
                </div> 
                </div>                   
              </div>
            </div>
       );
      }
  }

export default PhoneCatalogueApp;