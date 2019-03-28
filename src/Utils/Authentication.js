import {Component} from 'react';


const access_token = "access_token";
const user_id = "user_id";
const is_admin = "is_admin";

class Authentication extends Component {
    static isLoggedIn(){
        return localStorage.getItem(access_token
            ) ? true : false;
    }

    static isAuthed(){
        return this.isLoggedIn() && localStorage.getItem(is_admin) === "true";
    }

    static setAccessToken(id, token, admin){
        localStorage.setItem(access_token, token);
        localStorage.setItem(user_id, id);
        localStorage.setItem(is_admin, admin);
    }
    
    static deleteSession(){
        localStorage.removeItem(access_token);
        localStorage.removeItem(user_id);
        localStorage.removeItem(is_admin);
    }
    static getUserId(){
        return localStorage.getItem(user_id);
    }

    static getAccessToken(){
        return localStorage.get(access_token);
    }
}

export default Authentication;