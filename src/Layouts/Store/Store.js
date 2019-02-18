import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../Components/NavBar.js';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Banner from '../../Images/universe.jpg';
import ListCard from '../../Components/ListCard';
import Footer from '../../Components/Footer';
import { Grid, ListItem, ListItemText, Typography, InputBase} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({
    heroUnit: {
        backgroundImage: 'url('+ Banner +')',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        width: '100%',
        height: 300,
        zIndex: 1,
        position: 'relative',
    },
    heroContent: {
        maxWidth: 700,
        margin: '0 auto',
        
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    layout: {
        zIndex: 2,
        width: '100%',
        marginRight: 'auto',
        marginLeft: 'auto',
        padding: '0px 50px 50px 50px',
        position: 'relative',
        boxShadow: '0 -30px 80px 50px #303030',
    },
    cardGrid: {
        padding: '${theme.spacing.unit * 8}px 0',
    },

    mainGrid: {
        width: '100%!important',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 5,
        marginBottom: theme.spacing.unit * 10,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: 'auto',
          width: 300,
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    inputRoot: {
        color: 'white',
        width: '100%',
      },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: 200,
        },
    },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const cards_data = [
    { id: 1, title: "Data", description: "Name hello 1" },
    { id: 2, title: "Data 2", description: "Name hello 2" },
    { id: 3, title: "Data 3", description: "Name hello 3" },
    { id: 4, title: "Data 4", description: "Name hello 4" },
    { id: 5, title: "Data 5", description: "Name hello 5" },
    { id: 6, title: "Data 6", description: "Name hello 6" },
    { id: 7, title: "Data 7", description: "Name hello 7" },
    { id: 8, title: "Data 8", description: "Name hello 8" },
];

function generate(element) {
    return [0, 1, 2].map(value =>
      React.cloneElement(element, {
        key: value,
      }),
    );
}
  

class Store extends Component {
    state = {
        selectedIndex: 1,
      };
    
    handleListItemClick = (event, index) => {
        this.setState({ selectedIndex: index });
    };
    
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CssBaseline />
                <NavBar />
                    <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h4" align="center" color="textPrimary" gutterBottom>
                        Store
                        </Typography>
                    </div>
                    </div>
                    <div className={classes.layout}>
                    <main>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search…"
                        classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                        }}
                        />
                    </div>
                    <Grid justify="center"  className={classes.mainGrid} container spacing={40}>
                    <Grid item xs={12} md={2} >
                        <Typography variant="h6" className={classes.title}>
                            Order By
                        </Typography>
                        <Divider />
                            <List component="nav">
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 1}
                                onClick={event => this.handleListItemClick(event, 1)}
                            >
                                <ListItemText primary="Popularity" />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 2}
                                onClick={event => this.handleListItemClick(event, 2)}
                            >
                                <ListItemText primary="Price" />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 3}
                                onClick={event => this.handleListItemClick(event, 3)}
                            >
                                <ListItemText primary="Name" />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 4}
                                onClick={event => this.handleListItemClick(event, 4)}
                            >
                                <ListItemText primary="Rating" />
                            </ListItem>
                            </List>
                    </Grid>
                    <Grid item xs={12} md={10} >
                    <div className={classes.cardGrid}>
                    <ListCard data={cards_data}/>
                    </div>
                    </Grid>
                    </Grid>
                    
                </main>
                </div>
                {/* Footer */}
                <Footer/>
                {/* End footer */}
            </React.Fragment>
        );
    }

}

Store.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Store);