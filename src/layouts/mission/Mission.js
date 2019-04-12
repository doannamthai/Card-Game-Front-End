import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {MISSION_URL} from '../../ApisURL';
import CssBaseline from '@material-ui/core/CssBaseline';
import Footer from '../../components/Footer';
import NavBar from '../../components/NavBar.js';
import { Divider } from '@material-ui/core';


const styles = theme => ({
  main: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit*10,
    paddingBottom: 200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
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


class Mission extends React.Component {
  state = {
    expanded: null,
    missions: [],
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  componentDidMount(){
      this.fetchData();
  }

  fetchData = () => {
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
              missions: m,
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
    const { expanded } = this.state;

    return (
        <React.Fragment>
        <CssBaseline />
        <NavBar />
      <div className={classes.main}>
      <Typography component="h2" variant="h4">Missions for you</Typography>
      <br></br>
      <Divider/>
      <br></br>
      {this.state.missions.map((mission, index) => 
        <ExpansionPanel expanded={expanded === mission.key} onChange={this.handleChange(mission.key)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>Mission {index+1}</Typography>
            <Typography className={classes.secondaryHeading}>Coins reward: <b>{mission.reward}</b></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              {mission.description}
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )}
      </div>
       {/* Footer */}
       <Footer/>
         {/* End footer */}
        </React.Fragment>
    );
  }
}

Mission.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Mission);