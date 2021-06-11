import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import aboutImage from "../../../styles/images/about.png"
import valuesImage from "../../../styles/images/values.png"
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => {
    return {
        root: {
            maxWidth: 700,
        },
        media: {
            height: 440,
        },
        title: {
            marginBottom: 30
        }

    }


})


const AboutPage = () => {
    const classes = useStyles()


    return (
        <div className="listEntities">
            <Typography variant="h4" align="center" className={classes.title}>About us</Typography>
            <Grid container spacing={2} >
                <Grid item xs={6} >
                    <Card className={classes.root}>
                        <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    The power of teamwork
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Behind every great human achievement, there is a team.
                                    From medicine and space travel, to disaster response and pizza deliveries, our products help teams all over the planet advance humanity through the power of software.
                                    Our mission is to help unleash the potential of every team.
                                </Typography>
                            </CardContent>
                            <CardMedia
                                className={classes.media}
                                image={aboutImage}

                            />
                        </CardActionArea>

                    </Card>
                </Grid>
                <Grid item xs={6} >
                    <Card className={classes.root}>
                        <CardActionArea>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Values to live by
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    Our unique values describe, at the most fundamental level, what we stand for. These five values shape our culture, influence who we are, what we do, and even who we hire. They're hard-wired into our DNA and will stay the same as we continue to grow.
                                </Typography>
                            </CardContent>
                            <CardMedia
                                className={classes.media}
                                image={valuesImage}
                            />
                        </CardActionArea>

                    </Card>
                </Grid>
            </Grid>



        </div >
    )
}

export default AboutPage
