
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
        left: 0,
        bottom:0,
        right:0,
    },
    spacer: {
        padding: '100px 0 0 0',
    },
});
function Footer(props){
    const { classes }  = props;
    return(
        <div className={classes.spacer}>
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
                Card Game Project
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                Developed by Group 20
            </Typography>
        </footer>
        </div>
    );
}

export default withStyles(styles)(Footer);