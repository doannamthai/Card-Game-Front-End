import {Component} from 'react';


const access_token = "access_token";
class Authentication extends Component {
    static isLoggedIn(){
        return localStorage.getItem(access_token) ? true : false;
    }

    static isAuthed(){
        return this.isLoggedIn() && true;
    }

    static setAccessToken(token){
        localStorage.setItem(access_token, token);
    }
    
    static deleteSession(){
        localStorage.removeItem(access_token);
    }
}

export default Authentication;