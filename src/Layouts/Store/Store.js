import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../../components/NavBar.js';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListCard from '../../components/ListCard';
import Footer from '../../components/Footer';
import { ListItem, ListItemText, Typography, InputBase} from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import {CARD_URL} from '../../ApisURL';


const styles = theme => ({
    root: {
        display: 'flex',
    },
    content: {
        display: 'flex',
        width: '100%',
        paddingBottom: 250,
    },
    mailContent: {
        flexGrow: 1,
        padding: theme.spacing.unit * 8,
        textAlign: 'center',
      },
    
    mailItem: {
        marginTop: theme.spacing.unit * 10,
    },
    drawer: {
        width: 250,
        flexShrink: 0,
        border: 0,
        paddingBottom: 250,
    },
      drawerPaper: {
        width: 250,
        marginTop: '64px',
        border: 0,
        padding: 20,
    },
});


const fetchedData = [
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    },
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    },
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    },
    {"Rarity": null,
    "Price": 0,
    "Use": null,
    "Title": null,
    "Link": null,
    "Id": null,
    }];

  const filterMap = {
      "price-asc-rank" : 1,
      "price-desc-rank" : 2,
      "rarity-asc-rank": 3,
      "rarity-desc-rank": 4,
  }
class Store extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedIndex: 0,
            cards: fetchedData,
        };
    
    }
    

    componentDidMount(){
        let q = this.props.location.search;
        if (q !== null && q.trim() !== ''){
            let id  = new URLSearchParams(q).get('filter');
            this.setState({
                selectedIndex: filterMap[id],
            });
        }
        this.setState({
            cards: fetchedData,
        })
    }
  
    fetchCardData = () => {
        return fetch(CARD_URL, {
            method: "POST",
        })
        .then(res => res.json())
        .then(
            (result) => {
                if (Object.entries(result).length !== 0 && !result.Error){
                  let arr = result.Cards;
                    this.setState({
                        cards: arr,
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
    
    handleListItemClick = (event, type) => {
        window.location.href = "/store?filter=" + type; 
    };
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <NavBar />
                <div className={classes.content}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor="left"
                    >
                        <Typography variant="h6" className={classes.title}>
                            Order By
                        </Typography>
                        <Divider />
                        <List component="nav">
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 1}
                                onClick={event => this.handleListItemClick(event, "price-asc-rank")}
                            >
                                <ListItemText primary="Price: Low to High" />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 2}
                                onClick={event => this.handleListItemClick(event, "price-desc-rank")}
                            >
                                <ListItemText primary="Price: High to Low" />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 3}
                                onClick={event => this.handleListItemClick(event, "rarity-asc-rank")}
                            >
                                <ListItemText primary="Rarity: Low to High" />
                            </ListItem>
                            <ListItem
                                button
                                selected={this.state.selectedIndex === 4}
                                onClick={event => this.handleListItemClick(event, "rarity-desc-rank")}
                            >
                                <ListItemText primary="Rarity: High to Low" />
                            </ListItem>
                        </List>


                    </Drawer>
                    <main className={classes.mailContent}>
                        <div className={classes.mailItem}>
                            <ListCard className={classes.cardGrid} data={this.state.cards} />
                        </div>
                    </main>
                </div>
                <Footer />
            </div>
            
        );
    }

}

Store.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Store);