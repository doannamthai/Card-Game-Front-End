



export const HOST = "http://localhost:8080";

export const LOGIN_URL  =  HOST + '/login';

/************ PROFILE ********* */
export const PROFILE_URL = HOST + '/profile';
export const PROFILE_UPDATE_URL = PROFILE_URL + "/update"

export const REGISTER_URL = HOST + '/register';

export const GET_USERS_URL = HOST + '/user/get';

/******** MESSAGE *******/
export const MESSAGE_URL = HOST + '/message';
export const SEND_MESSAGE_URL = MESSAGE_URL + '/send';
export const GET_MESSAGE_URL = MESSAGE_URL + '/get';
export const DELETE_MESSAGE_URL = MESSAGE_URL + '/delete';
export const READ_MESSAGE_URL = MESSAGE_URL + '/update';


/******** MISSION *******/
export const MISSION_URL = HOST + '/mission';
export const ADD_MISSION_URL = MISSION_URL + '/add'
export const DELETE_MISSION_URL = MISSION_URL + '/remove/mission'
export const UPDATE_MISSION_URL = MISSION_URL + '/update'


/******** CARD *******/
export const CARD_URL  = HOST + '/card';
export const ADD_CARD_URL =  CARD_URL + '/add';
export const UPDATE_CARD_URL =  CARD_URL + '/update';
export const DELETE_CARD_URL = CARD_URL + '/remove/card';
export const SELL_CARD_URL = CARD_URL + '/sell';
export const BUY_CARD_URL = CARD_URL + '/buy';
