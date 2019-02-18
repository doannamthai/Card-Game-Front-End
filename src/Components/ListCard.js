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
        paddingTop: '80%', // 16:9
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
                <Grid item key={card.id} sm={6} md={4} lg={3}>
                <Card className={classes.card}>
                    <CardContent  align="center" className={classes.cardContent}>
                        <Typography>{card.title}</Typography>
                    </CardContent>
                    <CardMedia
                        className={classes.cardMedia}
                        image={card.image} // eslint-disable-line max-len
                        title={card.title}
                    />
                    <CardContent className={classes.cardContent}>
                        <Typography>{card.description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                            View
                    </Button>
                        <Button size="small" color="primary">
                            Buy
                    </Button>
                    </CardActions>
                </Card>
                </Grid>                  
            )}
        </Grid>
    );
}

export default withStyles(styles)(ListCard);