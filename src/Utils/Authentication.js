import {Component} from 'react';


const access_token = "access_token";
const user_id = "user_id";
class Authentication extends Component {
    static isLoggedIn(){
        return localStorage.getItem(access_token) ? true : false;
    }

    static isAuthed(){
        return this.isLoggedIn() && true;
    }

    static setAccessToken(id, token){
        localStorage.setItem(access_token, token);
        localStorage.setItem(user_id, id);
    }
    
    static deleteSession(){
        localStorage.removeItem(access_token);
    }
}

export default Authentication;