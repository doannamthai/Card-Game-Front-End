import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import AdminNavBar from './AdminNavBar';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {CARD_URL, ADD_CARD_URL, UPDATE_CARD_URL, DELETE_CARD_URL} from '../../ApisURL';
import { Button } from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Authentication from '../../utils/Authentication';
import CircularProgress from '@material-ui/core/CircularProgress';
import { isAbsolute } from 'path';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  appBarSpacer: theme.mixins.toolbar,
  button: {
    margin: theme.spacing.unit,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
  loader: {
    margin: 'auto',
    width: 250,
    textAlign: 'center',
    position: isAbsolute,
  },
});



function shortencontent(content){
  if(content.length > 30){
      return content.substring(0, 20) + "...";
  }
  return   content;
}


function createData(key, title, use, link, price, rarity) {
  return { key, title, use, link, price, rarity };
}

function processCardData(jsonArray, dataStorage) {
  jsonArray.map((item, index) =>
    dataStorage.push(createData(item.Card_id, item.Title, item.Use, item.Link, item.Price, item.Rarity))
  )
}

const rarities = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'rare',
    label: 'Rare',
  },
  {
    value: 'epic',
    label: 'Epic',
  },
  {
    value: 'legendary',
    label: 'Legendary',
  },
];

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      openAlert: false,
      card_id: -1,
      title: '',
      use: '',
      link: '',
      price: 0,
      rarity: '',
      error: '',
      dialogTitle: '',
      dialogMessage: '',
      data: [],
      loading: true,
    };
  }
  
  setCardData(c_id, c_title, c_use, c_link, c_price, c_rarity){
    this.setState({
      card_id: c_id,
      title: c_title,
      use: c_use,
      link: c_link,
      price: c_price,
      rarity: c_rarity,
    })
  }

  handleClose = () => {
    this.setState({ 
      open: false, 
    });
  };

  handleCloseAlert = () => {
    this.setState({ 
      openAlert: false, 
    });
  }

  openEdit = index => v => {
    var c = this.state.data[index];
    this.setCardData(c.key, c.title, c.use, c.link, c.price, c.rarity);
    this.setState({
      open: true,
      dialogTitle: 'Edit card',
      dialogMessage: 'Modify the card information and apply changes'
    });
  }

  openAdd = () => {
    this.setCardData(-1, '', '', '', 0, '');
    this.setState({
      open: true,
      dialogTitle: 'Add new card',
      dialogMessage: 'Add a new card to the system'
    });
  }

  openDelete = index => v => {
    var c = this.state.data[index];
    this.setCardData(c.key, c.title, c.use, c.link, c.price, c.rarity);
    this.setState({
      openAlert: true,
    });
  }

  handleOnChange = (v) => {
    this.setState({
      [v.target.name]: v.target.value,
    });
  }

  onDelete = () => {
    
    fetch(DELETE_CARD_URL + "?user_id=" + Authentication.getUserId() + "&card_id=" + this.state.card_id, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
      .then(
        (result) => {
          if (!result.Error) {
            window.location.reload();
          } else {
            alert(result.Error);
          }
        },
        (error) => {
          alert(error);
        }
      )
  }

  onCardAction = () => {
    if (this.state.title.trim() === "" || this.state.use.trim() === "" || this.state.link.trim() === "" || this.state.rarity === ""){
      alert("Required fields must not be empty");
      return;
    }
    
    let ADD_CARD = ADD_CARD_URL + "?user_id=" + Authentication.getUserId();
    let UPDATE_CARD = UPDATE_CARD_URL + "?user_id=" + Authentication.getUserId() + "&card_id=" + this.state.card_id;
    let url = this.state.card_id === -1 ? ADD_CARD : UPDATE_CARD;

    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "cardTitle": this.state.title,
        "cardUse": this.state.use,
        "cardImgLink": this.state.link,
        "price": parseInt(this.state.price, 10),
        "rarity": this.state.rarity,
      }),
    }).then(res => res.json())
      .then(
        (result) => {
          if (!result.Error) {
            window.location.reload();
          } else {
            alert(result.Error);
          }
        },
        (error) => {
          alert(error);
        }
    )
  }


  componentDidMount() {
    this.fetchCardData();
  }

  fetchCardData = () => {
    return fetch(CARD_URL+"/getall", {
        method: "GET",
    })
    .then(res => res.json())
    .then(
        (result) => {
            if (Object.entries(result).length !== 0 && !result.Error){
              var c = [];
              processCardData(result.Cards, c);
              this.setState({
                data: c,
                loading: true,
              })
            }
            else {
              alert(result.Error)
            }
        },
        (error) => {
            console.log(error);
        }
    )
  }


  render() {
    const { classes } = this.props;

    const {loading} = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminNavBar />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Cards
              </Typography>
          <Fab color="primary" onClick={this.openAdd} aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
          <div className={classes.tableContainer}>
          {loading ? <div className={classes.loader}><CircularProgress color="secondary" className={classes.progress} />
                                <Typography className={classes.loadingFont}>Loading...</Typography></div>
              :
            <Paper className={classes.root}>
            
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Title</TableCell>
                    <TableCell align="left">Use</TableCell>
                    <TableCell align="left">Price</TableCell>
                    <TableCell align="left">Rarity</TableCell>
                    <TableCell align="left">Image URL</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.data.map((n, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index+1}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {n.title}
                      </TableCell>
                      <TableCell align="left">{shortencontent(n.use)}</TableCell>
                      <TableCell align="left">{n.price}</TableCell>
                      <TableCell align="left">{n.rarity}</TableCell>
                      <TableCell component="th" scope="row">{ shortencontent(n.link)}</TableCell>
                      <TableCell align="left">
                        <Button variant="contained" onClick = {this.openEdit(index)} color="primary" >
                          Modify
                        </Button>
                        <Button variant="contained" onClick = {this.openDelete(index)} color="secondary" className={classes.button}>
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            
            </Paper>
          }
          </div>
        </main>
    
        <Dialog
          open={this.state.openAlert}
          onClose={this.handleCloseAlert}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">{"Delete the card"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete "{this.state.title}" from the database?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseAlert} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onDelete} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.state.dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.state.dialogMessage}
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              value={this.state.title}
              id="title"
              label="Title"
              type="title"
              name="title"
              required
              fullWidth
              onChange = {this.handleOnChange}
              
            />
            <TextField
              required
              autoFocus
              value={this.state.use}
              margin="normal"
              id="use"
              label="Use"
              type="use"
              name="use"
              rows={4}
              rowsMax={6}
              multiline
              onChange = {this.handleOnChange}
              fullWidth
            />
            <TextField
              autoFocus
              required
              value={this.state.link}
              id="link"
              margin="normal"
              label="Image Link"
              type="link"
              name="link"
              onChange = {this.handleOnChange}
              fullWidth
            />
            <TextField
              autoFocus
              required
              value={this.state.price}
              margin="normal"
              id="price"
              name="price"
              label="Price"
              type="number"
              onChange = {this.handleOnChange}
              fullWidth
            />
            <TextField
              id="standard-select-rarity"
              margin="normal"
              select
              required
              label="Rarity"
              name="rarity"
              className={classes.textField}
              value={this.state.rarity}
              onChange={this.handleOnChange}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              fullWidth
            >
              {rarities.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Typography>
              {this.state.error}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onCardAction} color="primary">
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard)
