import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

import officeImage from '../../../styles/images/office_work_1.jpg';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    details: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    title: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: '#384a9c',
      fontWeight: 'bold',
    },
    gridList: {
      flexWrap: 'nowrap',
      transform: 'translateZ(0)',
      height: 280,
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
  }));

  export default function Index() {
    const classes = useStyles();  

    const imageData = [
      {
          img: officeImage,
          title: 'Image',
      },
      {
          img: officeImage,
          title: 'Image',
      },
      {
        img: officeImage,
        title: 'Image',
      },
    ];

    return (
      <div className="listEntities">
        <h3 id="headerListOfProjects" className="header">Welcome!</h3>

        <GridList className={classes.gridList} cols={3}>
          {imageData.map((image) => (
            <GridListTile key={image.img}>
              <img src={image.img} alt={image.title} />
              <GridListTileBar
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
        
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.title}>Professional Services</Paper>
              <Paper className={classes.details}>Project Management</Paper>
              <Paper className={classes.details}>Business Consultancy</Paper>
              <Paper className={classes.details}>Software Architecture</Paper>
              <Paper className={classes.details}>Enterprise Arhitecture</Paper>
              <Paper className={classes.details}>System Integration</Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.title}>Solution implementation Services</Paper>
              <Paper className={classes.details}>Project Quality Assurance</Paper>
              <Paper className={classes.details}>Risk Management</Paper>
              <Paper className={classes.details}>Bid Management</Paper>
              <Paper className={classes.details}>Business Analysis</Paper>
              <Paper className={classes.details}>Solution Design</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
