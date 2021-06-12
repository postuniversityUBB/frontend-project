import React from 'react';
import Carousel from "react-material-ui-carousel"

import '../../../styles/scss/Carousel.scss';

import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button
} from '@material-ui/core';

function Banner(props) {
    const contentPosition = props.contentPosition ? props.contentPosition : "left"
    const totalItems = props.length ? props.length : 3;
    const mediaLength = totalItems - 1;

    let items = [];
    const content = (
        <Grid item xs={12 / totalItems} key="content">
            <CardContent className="Content">
                <Typography className="Title">
                    {props.item.Name}
                </Typography>

                <Typography className="Caption">
                    {props.item.Caption}
                </Typography>

                <Button variant="outlined" className="AboutEBSButton" href="/about">
                    About
                </Button>
            </CardContent>
        </Grid>
    )


    for (let i = 0; i < mediaLength; i++) {
        const item = props.item.Items[i];

        const media = (
            <Grid item xs={12 / totalItems} key={item.Image}>
                <CardMedia
                    className="Media"
                    image={item.Image}
                    title={item.Name}
                >
                    <Typography className="MediaCaption">
                        {item.Name}
                    </Typography>
                </CardMedia>

            </Grid>
        )

        items.push(media);
    }

    if (contentPosition === "left") {
        items.unshift(content);
    } else if (contentPosition === "right") {
        items.push(content);
    } else if (contentPosition === "middle") {
        items.splice(items.length / 2, 0, content);
    }

    return (
        <Card raised className="Banner">
            <Grid container spacing={0} className="BannerGrid">
                {items}
            </Grid>
        </Card>
    )
}

const items = [
    {
        Name: "EBS Software for All Teams",
        Caption: "Software development tool for teams",
        contentPosition: "left",
        Items: [
            {
                Name: "",
                Image: "https://source.unsplash.com/featured/?macbook"
            },
            {
                Name: "",
                Image: "https://source.unsplash.com/featured/?office space"
            }
        ]
    },
    {
        Name: "Professional Services",
        Caption: "",
        contentPosition: "middle",
        Items: [
            {
                Name: "",
                Image: "https://source.unsplash.com/featured/?developers"
            },
            {
                Name: "",
                Image: "https://source.unsplash.com/featured/?office meeting"
            }
        ]
    },
    {
        Name: "Welcome!",
        Caption: "",
        contentPosition: "right",
        Items: [
            {
                Name: "",
                Image: "https://source.unsplash.com/featured/?nature"
            },
            {
                Name: "",
                Image: "https://source.unsplash.com/featured/?Tokyo"
            }
        ]
    }
]

function CarouselWithImages() {

    return (
        <div style={{ marginTop: "80px", color: "#494949" }}>
            <Carousel
                autoPlay={true}
                animation={"slide"}
                indicators={true}
                timeout={400}
                cycleNavigation={true}
                navButtonsAlwaysVisible={false}
                navButtonsAlwaysInvisible={true}

            >
                {
                    items.map((item, index) => {
                        return <Banner item={item} key={index + item.Name} contentPosition={item.contentPosition} />
                    })
                }
            </Carousel>
        </div>
    )
}

export default CarouselWithImages;
