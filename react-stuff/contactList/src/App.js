    import React from 'react';
    import api from './test/stubAPI'
    import buttons from './config/buttonsConfig';

    class ContactForm extends React.Component {
        state = { name: '', address: '', phone_number : ''};
        
        handleNameChange = (e) =>  this.setState({name: e.target.value});

        handleAddressChange = (e) => this.setState({address: e.target.value});

        handlePhoneNumChange = (e) =>  this.setState({phone_number: e.target.value});

        handleSubmit = (e) => {
           e.preventDefault();
           let name = this.state.name.trim();
           let address = this.state.address.trim();
           let phone_number = this.state.phone_number.trim();
           if (!name || !address || !phone_number) {
              return;
           }
           this.props.addHandler(name,address,phone_number);
           this.setState({name: '', address: '', phone_number: ''});
        }

      render() {
        return (
          <tr>
               <td>
               <input type="text" className="form-control" 
                      placeholder="Name"
                      value={this.state.name}
                      onChange={this.handleNameChange}
               />
               </td>
               <td>
               <input type="text" className="form-control"
                      placeholder="Address"
                      value={this.state.address}
                      onChange={this.handleAddressChange}
               />
               </td>
               <td>
               <input type="text" className="form-control" 
                      placeholder="Phone No."
                      value={this.state.phone_number}
                      onChange={this.handlePhoneNumChange}
               />
               </td>
               <td>
               <input type="button" className="btn btn-primary" value="Add"
                        onClick={this.handleSubmit} />
               </td>
          </tr>
          )
      }
    }
    
    class Contact extends React.Component {
         state = {
             status : '',
             name: this.props.contact.name,
             address: this.props.contact.address,
             phone_number: this.props.contact.phone_number
          };
  
          handleEdit = () =>  this.setState({ status : 'edit'} );
 
          handleSave = (e) => {
            e.preventDefault();
            var name = this.state.name.trim();
            var address = this.state.address.trim();
            var phone_number = this.state.phone_number.trim();
            if (!name || !address || !phone_number) {
              return;
            }
            this.setState({status : ''} )
            this.props.updateHandler(this.props.contact.phone_number,
                     name,address,phone_number);
          };             
          handleCancel = function() {
              this.setState({ status : '', 
                    name: this.props.contact.name,
                    address: this.props.contact.address,
                    phone_number: this.props.contact.phone_number} ) ;
          }.bind(this) 

          handleDelete = () => {
             this.setState({ status : 'del'} )
          };      

          handleConfirm = (e) => { 
              this.props.deleteHandler(this.props.contact.phone_number) ;
          };

            handleNameChange = (e) =>  this.setState({name: e.target.value});
            
            handleAddressChange = (e) => this.setState({address: e.target.value});
            
            handlePhoneNumChange = (e) =>  this.setState({phone_number: e.target.value});
                     
            render() {
                 let activeButtons = buttons.normal ;
                 let leftButtonHandler = this.handleEdit ;
                 let rightButtonHandler = this.handleDelete ;
                 let fields = [
                         <td key={'name'} >{this.state.name}</td>,
                          <td key={'address'}>{this.state.address}</td>,
                          <td key={'phone_number'}>{this.state.phone_number}</td>
                       ] ;
                if (this.state.status === 'del' ) {
                     activeButtons = buttons.delete ;
                     leftButtonHandler = this.handleCancel;
                     rightButtonHandler = this.handleConfirm ;
                } else if (this.state.status === 'edit' ) {
                       activeButtons = buttons.edit ;
                       leftButtonHandler = this.handleSave;
                       rightButtonHandler = this.handleCancel ;
                       fields = [
                          <td key={'name'}><input type="text" className="form-control"
                             value={this.state.name}
                             onChange={this.handleNameChange} /> </td>,
                          <td key={'address'}><input type="text" className="form-control"
                             value={this.state.address}
                             onChange={this.handleAddressChange} /> </td>,
                          <td key={'phone_number'}><input type="text" className="form-control"
                             value={this.state.phone_number}
                             onChange={this.handlePhoneNumChange} /> </td>,
                       ] ;
                   }                
                  return (
                        <tr >
                          {fields}
                          <td>
                              <input type="button" className={'btn ' + activeButtons.leftButtonColor} 
                                     value={activeButtons.leftButtonVal}
                                     onClick={leftButtonHandler} />
                          </td>
                          <td>
                             <input type="button" className={'btn ' + activeButtons.rightButtonColor} 
                                   value={activeButtons.rightButtonVal} 
                                   onClick={rightButtonHandler} />
                          </td>
                          </tr>
                       ) ; 
            }
    }

    class ContactList extends React.Component {
      render() {
         let contactRows =   this.props.contacts.map( (c) => {
              return <Contact key={c.phone_number} contact={c} 
                    deleteHandler={this.props.deleteHandler} 
                    updateHandler={this.props.updateHandler} /> ; // CHANGE 
              });
          return (
              <tbody >
                  {contactRows}
                  <ContactForm 
                      addHandler={this.props.addHandler}/>
              </tbody>
            ) ;
        }
    }

    class ContactsTable extends React.Component {
      render() {
          return (
            <table className="table table-bordered">
                <thead>
                  <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th></th>
                  <th></th>
                  </tr>
                </thead>
                  <ContactList contacts={this.props.contacts} 
                         deleteHandler={this.props.deleteHandler} 
                         addHandler={this.props.addHandler}
                         updateHandler={this.props.updateHandler}  />
            </table>
            );
      }
    }

    class ContactsApp extends React.Component {
        updateContact = (key, n, a, p) => {
            api.update(key,n,a,p); 
            this.setState({});                          
        };
        addContact = (n, a, p) => {
           api.add(n,a,p) ;
           this.setState({});
        };
        deleteContact = (k) => {
           api.delete(k);
           this.setState( {} ) ;
        };

      render() {
          let contacts = api.getAll() ;
          return (
                <div>
                   <h1>Contact List.</h1>
                   <ContactsTable contacts={contacts} 
                        deleteHandler={this.deleteContact}
                        addHandler={this.addContact} 
                        updateHandler={this.updateContact}  />   
                </div>
          );
      }
    }

    export default ContactsApp;