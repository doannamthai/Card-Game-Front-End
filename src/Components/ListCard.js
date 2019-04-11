import React from 'react';
import {Grid, Card, CardMedia, CardContent, CardActions, Typography, Button, } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 0,
        paddingTop: '135%', 
    },
    cardContent: {
        flexGrow: 1,
    },
});
function ListCard(props) {
    const {classes} = props;
    return (
        <Grid container spacing={40}>
            {props.data.map((card) => 
                <Grid item key={card.Id} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.Link}
                        title={card.Title}
                    />
                    <CardContent  align="center" className={classes.cardContent}>
                        <Typography gutterBottom variant="h6" component="h2">
                            {card.Title}
                        </Typography>
                    </CardContent>
                    <CardContent  align="left" className={classes.cardContent}>
                        <Typography style={{fontSize: 16}} gutterBottom variant="h6">
                            Price: <b>{card.Price}</b>
                        </Typography>
                        <Typography style={{fontSize: 16}} gutterBottom variant="h6">
                            Rarity: <b>{card.Rarity}</b>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => window.location.href = "/card/" + card.Id + "?o=" + card.Owner} color="primary">
                            View
                        </Button>
                    </CardActions>
                </Card>
                </Grid>                  
            )}
        </Grid>
    );
}

export default withStyles(styles)(ListCard);