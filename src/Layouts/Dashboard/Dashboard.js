import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import UniverseBackground from '../../Images/hell.jpg';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import {CARD_URL} from '../../ApisURL';
import CircularProgress from '@material-ui/core/CircularProgress';


const styles = theme => ({
  main: {
    paddingBottom: 200,
  },
  heroUnit: {
    backgroundImage: 'url('+ UniverseBackground +')',
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    backgroundSize: "cover",
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '135%', 
  },
  cardContent: {
    flexGrow: 1,
  },
  loader: {
    margin: 'auto',
    width: 250,
    textAlign: 'center',
  },
  loadingFont: {
    color: "rgba(255, 255, 255, 0.7)", 
    fontSize: 14,
  },
});

const fetchedData = [
  {"Rarity": null,
  "Price": 0,
  "Use": null,
  "Title": null,
  "Link": null,
  "Id": -1,
  },
  {"Rarity": null,
  "Price": 0,
  "Use": null,
  "Title": null,
  "Link": null,
  "Id": -2,
  },
  {"Rarity": null,
  "Price": 0,
  "Use": null,
  "Title": null,
  "Link": null,
  "Id": -3,
  },
  {"Rarity": null,
  "Price": 0,
  "Use": null,
  "Title": null,
  "Link": null,
  "Id": -4,
  },
]
class Dashboard extends Component {

  state = {
      cards: fetchedData,
      loading: true,
  }

  componentDidMount(){
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
                let arr = result.Cards.slice(0, 8);
                  this.setState({
                      cards: arr,
                      loading: false,
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

  handleOnLink = link => v => {
      window.location.href = link;
  };


  render() {
    const { classes } = this.props;
    const {  cards, loading} = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <main className={classes.main}>
          {/* Hero unit */}
          <div className={classes.heroUnit}>
            <div className={classes.heroContent}>
              <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                The Innovation of Card Game
            </Typography>
              <Typography variant="h6" align="center" color="textSecondary" paragraph>
                A card game is any game using playing cards as the primary device with which the game is played, be they traditional or game-specific.
            </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={16} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary">
                      Get Started
                  </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </div>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            {/* End hero unit */}
            <Grid container spacing={40}>
              {loading ? <div className={classes.loader}><CircularProgress color="secondary" className={classes.progress} />
              <Typography className={classes.loadingFont}>Don't leave, we are loading your cards...</Typography></div> : cards.map((card, index) => (
                <Grid item key={card.Card_id} sm={6} md={4} lg={3}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image={card.Link}
                      title={Card.Title}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h6" component="h2">
                        {card.Title}
                      </Typography>
                      <Typography>
                        {card.Name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button onClick={this.handleOnLink("/card/" + card.Card_id + "?o=" + card.Owner)} size="small" color="primary">
                        View
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>

          }
              </main>
        {/* Footer */}
        <Footer />
        {/* End footer */}
      </React.Fragment>
    )
  }
}

Dashboard.propTypes = {
classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);