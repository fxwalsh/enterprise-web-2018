import React from 'react';
import localCache from './localCache';
import request from 'superagent' ; 

class Specification extends React.Component {
  render(){
      let phone = this.props.phone ;           
      let availability = phone.availability.map(function(avb,index) {
          return <dd key={index}>{avb}</dd> ;
          }) ;
      let dimensions = phone.sizeAndWeight.dimensions.map(function(dim,index) {
          return  <dd key={index}>{dim}</dd> ;
          }) ;
      let display = (
          <div>
            <ul className="specs">
              <li >
                <span>Availability and Networks</span>
                <dl>
                  <dt>Availability</dt>
                     {availability}
                </dl>
              </li>
              <li>
                <span>Battery</span>
                <dl>
                  <dt>Type</dt>
                  <dd>{phone.battery.type}</dd>
                  <dt>Talk Time</dt>
                  <dd>{phone.battery.talkTime}</dd>
                  <dt>Standby time (max)</dt>
                  <dd>{phone.battery.standbyTime}</dd>
                </dl>
              </li> 
              <li>
                <span>Storage and Memory</span>
                <dl>
                  <dt>RAM</dt>
                  <dd>{phone.storage.ram}</dd>
                  <dt>Internal Storage</dt>
                  <dd>{phone.storage.flash}</dd>
                </dl>
              </li>
              <li>
                <span>Connectivity</span>
                <dl>
                  <dt>Network Support</dt>
                  <dd>{phone.connectivity.cell}</dd>
                  <dt>WiFi</dt>
                  <dd>{phone.connectivity.wifi}</dd>
                  <dt>Bluetooth</dt>
                  <dd>{phone.connectivity.bluetooth}</dd>
                  <dt>Infrared</dt>
                  <dd>{phone.connectivity.infrared}</dd>
                  <dt>GPS</dt>
                  <dd>{phone.connectivity.gps}</dd>
                </dl>
              </li>
              <li>
                <span>Android</span>
                <dl>
                  <dt>OS Version</dt>
                  <dd>{phone.android.os}</dd>
                  <dt>UI</dt>
                  <dd>{phone.android.ui}</dd>
                </dl>
              </li>
              <li>
                <span>Size and Weight</span>
                <dl>
                  <dt>Dimensions</dt>
                      {dimensions}
                   <dt>Weight</dt>
                  <dd>{phone.sizeAndWeight.weight}</dd>
                </dl>
              </li> 
              <li>
                <span>Display</span>
                <dl>
                  <dt>Screen size</dt>
                  <dd>{phone.display.screenSize}</dd>
                  <dt>Screen resolution</dt>
                  <dd>{phone.display.screenResolution}</dd>
                  <dt>Touch screen</dt>
                  <dd>{phone.display.touchScreen}</dd>
                </dl>
              </li>
              <li>
                <span>Hardware</span>
                <dl>
                  <dt>CPU</dt>
                  <dd>{phone.hardware.cpu}</dd>
                  <dt>USB</dt>
                  <dd>{phone.hardware.usb}</dd>
                  <dt>Audio / headphone jack</dt>
                  <dd>{phone.hardware.audioJack}</dd>
                  <dt>FM Radio</dt>
                  <dd>{phone.hardware.fmRadio}</dd>
                  <dt>Accelerometer</dt>
                  <dd>{phone.hardware.accelerometer}</dd>
                </dl>
              </li> 
              <li>
                <span>Camera</span>
                <dl>
                  <dt>Primary</dt>
                  <dd>{phone.camera.primary}</dd>
                  <dt>Features</dt>
                  <dd>{phone.camera.features.join(', ')}</dd>
                </dl>
              </li>
              <li>
                <span>Additional Features</span>
                <dd>{phone.additionalFeatures}</dd>
              </li>           
              </ul>            
        </div>
       )
      return (
           <div>
              {display}
          </div>
         );
  }
};


class ImagesSection extends React.Component { 
  render(){
      var thumbImages = this.props.phone.images.map(function(img,index) {
          return (
            <li>
               <img key={index} src={"/phoneSpecs/" + img}
                   alt="missing" />
            </li>
            ) ;
          } );
      var mainImage = (
        <div className="phone-images">
          <img src={"/phoneSpecs/" + this.props.phone.images[0]} 
                alt={this.props.phone.name}
                className="phone" />
        </div>
        ) ;
        return (
            <div>
               {mainImage}
               <h1>{this.props.phone.name}</h1>
               <p>{this.props.phone.description}</p>
               <ul className="phone-thumbs">
                   {thumbImages}
               </ul>
              </div>
              );
      }
};

class PhoneDetail extends React.Component {
    state = { };

   componentDidMount() {
      request.get(
         '/phoneSpecs/phones/' + this.props.params.id + '.json', (err, res) => {
            let json = JSON.parse(res.text);
            localCache.setPhone(json);
                this.setState({});
       }) ;
  } 

  render(){
      let display = <p>No phone details</p> ; 
      let phone = localCache.getPhone();
      if (phone) {
        display =  (
            <div>
               <ImagesSection phone={phone} />
               <Specification  phone={phone} />      
            </div>
            ) ;
      }
      return (
        <div>
          {display}
        </div>
        );
  }
};

export default PhoneDetail;
