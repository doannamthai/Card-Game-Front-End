import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import { Divider, Button } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import {CARD_URL, BUY_CARD_URL} from '../../ApisURL';
import DollarSign from '@material-ui/icons/MonetizationOnRounded';
import SearchIcon from '@material-ui/icons/SearchRounded';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Authentication from '../../utils/Authentication';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1650 + theme.spacing.unit * 3 * 2)]: {
      width: 1650,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    paddingBottom: 200,
  },
  mainGrid: {
    marginTop: theme.spacing.unit * 10,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  media: {
    maxHeight: 700,
    textAlign: 'center',
  },
  description: {
    marginTop: theme.spacing.unit * 3,
  },
  chip: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    fontSize: 16,
  },
  button: {
    width: 200,
  },
});

let OWNER_ID = 0;

class CardProfile extends Component {
  constructor(props){
    super(props);
    let h = this.props.location.search+"";
    OWNER_ID = parseInt(h.slice(3, h.length), 10);
  }
  state = {
    open: false,
    card_id: -1,
    image: null,
    title: 'This is title of this card',
    description: 'Description of the card',
    price: 0,
    rarity: 'Rarity of the card'
  }

  handleClose = () => {
    this.setState({ 
      open: false, 
    });
  };

  componentDidMount() {
    this.fetchCardData()
  }

  fetchCardData() {
    let id = this.props.match.params.cardId;
    fetch(CARD_URL + "?card_id=" + id, {
      method: "POST",
    })
    .then(res => res.json())
    .then(
        (result) => {
          if (!result.Error) {
            console.log(JSON.stringify(result));
            this.setState({
              cardId: id,
              image: result.Link,
              title: result.Title,
              description: result.Use,
              rarity: result.Rarity,
              price: result.Price
            });
          } else {
            alert(result.Error)
          }
        },
        // Note: it's important to handle errors here
        (error) => {
          console.log(error);
        }
    )
  }

  handleBuyCard = () => {

    let cardId = this.state.card_id;
    let userId = Authentication.getUserId();
    
    fetch(BUY_CARD_URL + "?user_id=" + userId + "&card_id=" + cardId, {
        method: "POST",
    })
    .then(res => res.json())
    .then(
        (result) => {
            if (!result.Error){
                window.location.href = "/store";
            }
            else alert(result.Error);
        },
        // Note: it's important to handle errors here
        (error) => {
            console.log(error);
        }
    )
}


  render() {
    const { classes } = this.props;
    const { title, description, image, price, rarity} =  this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <main>
          <div className={classes.layout}>
            <Grid container spacing={40} className={classes.mainGrid}>
              <Grid item xs={12} md={4} className={classes.media}>
                <img className={classes.cardImage} src={image} alt="Card" />
                <Button
                  variant="contained"
                  color="default"
                  onClick={this.onBuy}
                  className={classes.button}
                  disabled={OWNER_ID === 1 ? true : false}
                  >
                  Buy
                </Button>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom>
                  {title}
                </Typography>
                <Divider/>
                <div className = {classes.description}>
                <Chip icon={<DollarSign/>} label={"Price: " + price}  className={classes.chip} />
                <Chip icon={<SearchIcon/>} label={"Rarity: " + rarity}  className={classes.chip} />
                <Typography variant="h6" >
                  {description}
                </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
          >
            <DialogTitle id="alert-dialog-title">{"Sell the card"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Please confirm to purchase "{this.state.title}" with {this.state.price} coins ?
                  </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
                         </Button>
              <Button onClick={this.handleBuyCard} color="primary">
                Continue
                       </Button>
            </DialogActions>
          </Dialog>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
  
}

CardProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardProfile);