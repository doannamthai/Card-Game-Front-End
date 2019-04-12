import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StoreIcon from '@material-ui/icons/Store';
import PeopleIcon from '@material-ui/icons/People';
import LayersIcon from '@material-ui/icons/Layers';
import { Link } from "react-router-dom";



const map = [
    { id: 1, title: "Cards",  link : "/admin/cards", icon: <PeopleIcon/>},
    { id: 2, title: "Missions",  link : "/admin/missions", icon: <LayersIcon/>},
    { id: 3, title: "Main page",  link : "/", icon: <StoreIcon/>},

]

function RenderList(props){
  return (
    props.navdata.map((s) =>
      <ListItem button key={s.id} selected={window.location.pathname === s.link} component={Link} to={s.link} >
        <ListItemIcon>
          {s.icon}
        </ListItemIcon>
        <ListItemText primary={s.title} />
      </ListItem>
    )
  );
}

class ListNavBar extends Component {


  render() {

    return (
      <div>
        <RenderList navdata = {map}/>
      </div>
    )
  }
}

export default ListNavBar;

