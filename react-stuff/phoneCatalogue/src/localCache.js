
class LocalCache {

    constructor() {
       this.phone = null ;
    }

    setPhone(phone) {
       this.phone = phone ;
    }

    getPhone() {
       return this.phone;
    }

}

export default (new LocalCache() );
