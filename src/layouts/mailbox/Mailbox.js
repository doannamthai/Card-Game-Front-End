import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from '../../components/NavBar';
import Authentication from '../../utils/Authentication';
import classNames from 'classnames';
import { withStyles} from "@material-ui/core";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Drawer from '@material-ui/core/Drawer';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import MailHolder from '../../Images/mailholder.svg';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import InboxIcon from '@material-ui/icons/Inbox';
import {READ_MESSAGE_URL, GET_MESSAGE_URL, DELETE_MESSAGE_URL} from '../../ApisURL';
import Tooltip from '@material-ui/core/Tooltip';
import MailSender from './MailSender';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    display: 'flex',
    width: '100%',
  },

  mailContent: {
    flexGrow: 1,
    padding: theme.spacing.unit * 8,
    textAlign: 'center',
  },

  mailItem: {
    marginTop: theme.spacing.unit * 10,
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,

  },

  header: {
    backgroundColor: '#333',
  },
  drawer: {
    width: 400,
    flexShrink: 0,
    border: 0,
  },
  drawerPaper: {
    backgroundColor: '#333',
    width: 400,
    marginTop: '64px',
    border: 0,
  },

  detail: {
    padding: theme.spacing.unit * 2,
    textAlign: 'left',
    backgroundColor: 'rgba(248,249,250,0.08)',
  },
  
  greyFont: {
    color: "#aaa",
    fontWeight: "normal",
  },
  boldFont: {
    fontWeight: "bold!important",
    color: "#f5f5f5!important",
  },
  rightTools: {
    float: 'right',
  },
  darkTooltip: {
    backgroundColor: 'black',
    color: '#f5f5f5',
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
});

function shortencontent(content){
  if(content.length > 80){
      return content.substring(0, 70) + "...";
  }
  return   content;
}


function deleteMail(user_id, msg_id){
  return fetch(DELETE_MESSAGE_URL + "?user_id=" + user_id + "&message_id=" + msg_id, {
    method: "POST",
  });
}




class MailBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sent: [],
      received: [],
      curReadingIndex: -1,
      curMail: null,
      readingReceived: true,
      composerOn: false,
      anchorEl: null,
    }
  }

  handleOnChange(v) {
    this.setState({
      [v.target.name]: v.target.value,
    })
  }

  switchInbox = () => {
    this.setState({
      readingReceived: !this.state.readingReceived,
      curReadingIndex: -1,
    })
  }

  componentDidMount() {
    this.fetchMail();
  }

  fetchMail() {
    return fetch(GET_MESSAGE_URL + "?user_id=" + Authentication.getUserId(), {
      method: "POST",
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.Error) {
            this.setState({
              sent: result.Sent_to,
              received: result.Receive_from,
              readingReceived: true,
            });
          } else {
            alert(result.Error)
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  onReadMail = index => v =>{
    let mail = null;
    if (this.state.readingReceived) 
      mail = this.state.received[index];
    else
      mail = this.state.sent[index];

    this.setState({
      curReadingIndex: index,
      curMail: mail,
    });

    // If this is unread, mark read in the database
    if (this.state.readingReceived && !mail.Read){
      fetch(READ_MESSAGE_URL + "?user_id=" + Authentication.getUserId() + "&message_id=" + mail.Msg_id + "&read=true", {
        method: "POST",
      })
      .then(res => res.json())
      .then(
        (result) => {
         if (!result.Error){
           // Empty
         }
        },
        (error) => {
          console.log(error)
        }
      )
    } 

    mail.Read = true;
  }


  onDeleteMail = index => v => {

   deleteMail(Authentication.getUserId(), this.state.curMail.Msg_id)
    .then(res => res.json())
    .then(
      (result) => {
       if (!result.Error){
          window.location.reload();
       }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  switchComposer = () => {
    this.setState({
      composerOn: !this.state.composerOn,
    });
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {

    const { classes } = this.props;
    const { sent, received, curMail, curReadingIndex, readingReceived, composerOn} = this.state;
    const open = Boolean(this.state.anchorEl);
    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar />
        {composerOn ? <MailSender onOpen={this.switchComposer}/> : null}
        <div className={classes.content}>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
            anchor="left"
          >
            <List subheader={
            <ListSubheader className={classes.header}>
            Message ⟩⟩ {readingReceived ? "Inbox" : "Sent"}
            <span className={classes.rightTools}>
              <Tooltip title="New message" classes={{ tooltip: classes.darkTooltip }}>
                <IconButton
                    aria-haspopup="true"
                    onClick={this.switchComposer}
                    color="inherit">
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={readingReceived ? "Sent messages" : "Inbox"} classes={{ tooltip: classes.darkTooltip }}>
                <IconButton
                    aria-haspopup="true"
                    onClick={this.switchInbox}
                    color="inherit">
                  { readingReceived ? <SendIcon /> : <InboxIcon/>}
                </IconButton>
              </Tooltip>
              </span>
  
            </ListSubheader>
            }>
              { (readingReceived ? received : sent).map((mail, index) =>
                <ListItem onClick={this.onReadMail(index)} key={mail.Msg_id} button alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt={mail.Name} src={mail.avatar}>{ mail.Name !== undefined && (mail.Name).length > 0 ? (mail.Name).charAt(0).toUpperCase() : null}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Typography  className={classNames(classes.greyFont, !mail.Read && classes.boldFont)}>{mail.Title}</Typography>}
                    secondary={
                      <React.Fragment>
                        <Typography component="span" className={classNames(classes.greyFont, !mail.Read && classes.boldFont)}>
                          {mail.Name}
                        </Typography>
                        <Typography component="span" className={classNames(classes.greyFont, !mail.Read && classes.boldFont)}>{shortencontent(mail.Content)}</Typography>
                      </React.Fragment>
                    }
                  />
                  <IconButton
                    aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                  <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    anchorEl={this.state.anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    PaperProps={{
                      style: {
                        boxShadow: 'none',
                        marginRight: '35px',
                      },
                    }}>
                    <MenuItem key="delete" onClick={this.onDeleteMail(index)}>Delete</MenuItem>
          
                  </Menu>
                </ListItem>
              )}
            </List>
          </Drawer>
          <main className={classes.mailContent}>
            <div className={classes.mailItem}>
              {curReadingIndex === -1 ? 
              <MailHolderHelper /> : 
              <Paper className={classes.detail} elevation={1}>
                <Typography style={{marginBottom: 15}} variant="h4" >
                {curMail.Title}
                </Typography>
                <Typography style={{marginBottom: 15,fontSize: 14}}  className={classes.greyFont}>{readingReceived ? 'from ' : 'to '}
                <span className={classes.boldFont}>{curMail.Name} • </span>
                {curMail.Date} at {curMail.Time}
                </Typography>
                
                <Divider/>
                <Typography paragraph style={{whiteSpace: 'pre-line', marginTop: 15, fontSize: 16, color: '#dbdbdb'}} >
                  {curMail.Content}
                </Typography>
              </Paper> 
            }

              
            </div>
          </main>
        </div>
      </div>
    );
  }

}

function MailHolderHelper(props){
  return (
    <div>
    <img width="500px" height="500px" src={MailHolder} alt="Holder"/>
    <Typography style={{color: "#aaa", fontSize: 20}}>Click on the message you want to see</Typography>
    </div>
  )
}

MailBox.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailBox);