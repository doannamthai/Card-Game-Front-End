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

import {MISSION_URL, ADD_MISSION_URL, UPDATE_MISSION_URL, DELETE_MISSION_URL} from '../../ApisURL';
import { Button } from '@material-ui/core';

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Authentication from '../../utils/Authentication';

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
});




function createData(key, description, reward) {
  return { key, description, reward};
}

function processCardData(jsonArray, dataStorage) {
  jsonArray.map((item, index) =>
    dataStorage.push(createData(item.Mission_id, item.Mission_description, item.Mission_reward))
  )
}


class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false,
      openAlert: false,
      mission_id: -1,
      mission_description: '',
      mission_reward: 0,
      data: [],
    };
  }
  


  setMissionData(m_id, m_description, m_reward){
    this.setState({
      mission_id: m_id,
      mission_description: m_description,
      mission_reward: m_reward,
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
    var m = this.state.data[index];
    this.setMissionData(m.key, m.description, m.reward);
    this.setState({
      open: true,
      dialogTitle: 'Edit mission',
      dialogMessage: 'Modify the mission information and apply changes'
    });
  }

  openAdd = () => {
    this.setMissionData(-1, '', 0);
    this.setState({
      open: true,
      dialogTitle: 'Add new mission',
      dialogMessage: 'Add a new mission to the system'
    });
  }

  openDelete = index => v => {
    var m = this.state.data[index];
    this.setMissionData(m.key, m.description, m.reward);
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
    
    fetch(DELETE_MISSION_URL + "?user_id=" + Authentication.getUserId() + "&mission_id=" + this.state.mission_id, {
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

  onAction = () => {
    if (this.state.mission_description.trim() === ""){
      alert("Required field must not be empty");
      return;
    }
    
    let ADD_MISSION = ADD_MISSION_URL + "?user_id=" + Authentication.getUserId();
    let UPDATE_MISSION = UPDATE_MISSION_URL + "?user_id=" + Authentication.getUserId() + "&mission_id=" + this.state.mission_id;

    let url = this.state.mission_id === -1 ? ADD_MISSION : UPDATE_MISSION;
      
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "missionDescription": this.state.mission_description,
        "coinsRewarded": parseInt(this.state.mission_reward, 10),
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
    return fetch(MISSION_URL, {
      method: 'POST',
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.Error) {
            var m = [];
            processCardData(result.Missions, m);
            this.setState({
              data: m,
            })
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

 

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminNavBar />

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Typography variant="h4" gutterBottom component="h2">
            Missions
              </Typography>
          <Fab color="primary" onClick={this.openAdd} aria-label="Add" className={classes.fab}>
            <AddIcon />
          </Fab>
          <div className={classes.tableContainer}>
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Reward</TableCell>
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
                        {n.description}
                      </TableCell>
                      <TableCell align="left">{n.reward}</TableCell>
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
          </div>
        </main>
    
        <Dialog
          open={this.state.openAlert}
          onClose={this.handleCloseAlert}
          aria-labelledby="alert-dialog-title"
        >
          <DialogTitle id="alert-dialog-title">{"Delete the mission"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this misison from the database?
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
              value={this.state.mission_description}
              multiline
              id="standard-textarea"
              label="Description"
              name="mission_description"
              required
              rows={4}
              rowsMax={6}
              fullWidth
              onChange = {this.handleOnChange}
            />
    
            <TextField
              autoFocus
              required
              value={this.state.mission_reward}
              margin="normal"
              id="price"
              name="mission_reward"
              label="Price"
              type="number"
              onChange = {this.handleOnChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.onAction} color="primary">
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
