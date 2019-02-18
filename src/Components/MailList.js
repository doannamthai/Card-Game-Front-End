import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    width: 350,
  },
  inline: {
    //display: 'inline',
  },
});

function shortencontent(content){
    if(content.length > 50){
        return content.substring(0, 30) + "...";
    }
    return   content;
}

function MailList(props) {
  const { classes } = props;
  return (
    <List className={classes.root}>
      {props.data.map((mail) => 
        <ListItem key ={mail.id} button alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={mail.sender} src={mail.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={mail.title}
            secondary={
              <React.Fragment>
                <Typography component="span" className={classes.inline} color="textPrimary">
                  {mail.sender}
                </Typography>
                {shortencontent(mail.content)}
              </React.Fragment>
            }
          />
        </ListItem>
      )}
    </List>
  );
}

MailList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailList);