import React, { Component } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {GET_USERS_URL, SEND_MESSAGE_URL} from '../../ApisURL';
import Authentication from "../../utils/Authentication";
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Select from 'react-select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


const styles = theme => ({ 
    header: {
        padding: theme.spacing.unit,
        fontSize: 16,
    },
    mainForm: {
        maxWidth: 500,
        maxHeight: 800,
        position: 'absolute',
        right: 10,
        bottom: 0,
        borderRadius: 10,
        boxShadow: '-webkit-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);-moz-box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75);box-shadow: 0px 0px 13px 0px rgba(0,0,0,0.75)',
    },
    paper: {
        zIndex: 1,
        position: 'absolute',
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    form: {
        padding: theme.spacing.unit * 2,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    cancel: {
        marginLeft: theme.spacing.unit * 2,
    },
});

const components = {
    Control,
    Menu,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};


function NoOptionsMessage(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
  }
  
  function Control(props) {
    return (
      <TextField
        fullWidth
        InputProps={{
          inputComponent,
          inputProps: {
            className: props.selectProps.classes.input,
            inputRef: props.innerRef,
            children: props.children,
            ...props.innerProps,
          },
        }}
        {...props.selectProps.textFieldProps}
      />
    );
  }
  
  function Option(props) {
    return (
      <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }
  
  function Placeholder(props) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.placeholder}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  
  function SingleValue(props) {
    return (
      <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
        {props.children}
      </Typography>
    );
  }
  
  function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
  }
  
  
  function Menu(props) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }

  function getDate(){
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    
    return today;
  }

  function getTime(){
    var now = new Date();
    var hour = ("0" + now.getHours()).slice(-2);
    var minute = ("0" + now.getMinutes()).slice(-2);
    var second = ("0" + now.getSeconds()).slice(-2); 
    return hour + ":" + minute + ":" + second;

  }

let user_id = Authentication.getUserId();

class MailSender extends Component {
    state = {
        receivers: [],
        user_id: '',
        title: '',
        content: '',
    }

    handleOnChange = name => v => {
        if ( v === null || v.target === undefined || v.target === null ){
            this.setState({
                [name]: v,
            });
        } else {
            this.setState({
                [name]: v.target.value,
            });
        }
    }

    cancelForm = (v) => {
        v.preventDefault();
        this.props.onOpen();
    }

    submitForm = (v) => {
        v.preventDefault();
        if (this.state.user_id === null || this.state.title.trim() === '' || this.state.content.trim() === ''){
            alert("Required fields cannot be empty");
            return;
        }
        fetch(SEND_MESSAGE_URL + "?user_id=" + user_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "title" : this.state.title,
                "content" : this.state.content, 
                "date" : getDate(),
                "time" : getTime(),
                "toUser": this.state.user_id.value,
            })
        })
        .then (res => res.json())
        .then (
            (result) => {
                if (!result.Error){
                    window.location.reload();
                } else {
                    alert(result.Error);
                }
            },

            (error) => {
                console.log(error);
            }
        )
    }

    componentDidMount(){
        this.fetchReceivers();
    }

    fetchReceivers(){
        return fetch(GET_USERS_URL, {
            method: "POST",
        })
        .then (res => res.json())
        .then (
            (result) => {
                if (!result.Error){
                    let arr = result.User
                    .filter(user => parseInt(user.id, 10) !== parseInt(user_id, 10))
                    .map(user => ({ 
                                value : user.id,
                                label : user.firstName + " " + user.lastName,
                        }));
                    
                    this.setState({
                        receivers: arr,
                    });
                    
                } else {
                    alert(result.Error);
                }
            },

            (error) => {
                console.log(error);
            }
        )
    }


    render(){
        const { classes, theme } = this.props;
        const selectStyles = {
            input: base => ({
              ...base,
              color: theme.palette.text.primary,
              '& input': {
                font: 'inherit',
              },
            }),
          };
        return (
        <Paper className={classes.mainForm}>
          <Typography className={classes.header} variant="h6">
            New message
          </Typography>
          <form autoComplete="off" className={classes.form}>
            <Select
            classes={classes}
            styles={selectStyles}
            options={this.state.receivers}
            components={components}
            value={this.state.user_id}
            onChange={this.handleOnChange("user_id")}
            placeholder="To user *"
            
            isClearable
            />
            
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="title">Title</InputLabel>
              <Input autoComplete="off" id="title" required onChange={this.handleOnChange("title")} />
            </FormControl>
            <FormControl margin="dense" required fullWidth>
              <InputLabel htmlFor="content">Content</InputLabel>
              <Input disableUnderline autoComplete="off" multiline rows={25} rowsMax={25} id="content" required onChange={this.handleOnChange("content")} />
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitForm}
              className={classes.submit}
            >
              Send
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.cancelForm}
              className={classes.cancel}
            >
              Cancel
            </Button>
          </form>
        </Paper>
        )
    }
};

MailSender.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,

};
  
export default withStyles(styles, { withTheme: true })(MailSender);
