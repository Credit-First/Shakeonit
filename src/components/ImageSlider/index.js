import React from "react";
import Carousel from "react-material-ui-carousel";
import autoBind from "auto-bind";
import CarouselBlueImg from "../../assets/slider-images/Frame1.png";
import CarouselBlackImg from "../../assets/slider-images/Frame3.png";
import CarouselBlImg from "../../assets/slider-images/Frame4.png";

import { Grid } from "@material-ui/core";
import { Box } from "@mui/material";

function Banner(props) {
  let item = props.item;
  return (
    <Box raised className="Banner">
      <Grid container spacing={0} className="BannerGrid">
        <img alt={item.alt} src={item.imgSrc} className="" />
      </Grid>
    </Box>
  );
}

const items = [
  {
    id: 1,
    alt: "carousel-blue",
    imgSrc: CarouselBlueImg,
  },
  {
    id: 2,
    alt: "carousel-black",
    imgSrc: CarouselBlackImg,
  },
  {
    id: 3,
    alt: "carousel-blue",
    imgSrc: CarouselBlImg,
  },
  {
    id: 4,
    alt: "carousel-black",
    imgSrc: CarouselBlackImg,
  },
];

class BannerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      autoPlay: true,
      animation: "fade",
      indicators: true,
      timeout: 500,
      navButtonsAlwaysVisible: false,
      navButtonsAlwaysInvisible: false,
      cycleNavigation: true,
    };

    autoBind(this);
  }

  toggleAutoPlay() {
    this.setState({
      autoPlay: !this.state.autoPlay,
    });
  }

  toggleIndicators() {
    this.setState({
      indicators: !this.state.indicators,
    });
  }

  toggleNavButtonsAlwaysVisible() {
    this.setState({
      navButtonsAlwaysVisible: !this.state.navButtonsAlwaysVisible,
    });
  }

  toggleNavButtonsAlwaysInvisible() {
    this.setState({
      navButtonsAlwaysInvisible: !this.state.navButtonsAlwaysInvisible,
    });
  }

  toggleCycleNavigation() {
    this.setState({
      cycleNavigation: !this.state.cycleNavigation,
    });
  }

  changeAnimation(event) {
    this.setState({
      animation: event.target.value,
    });
  }

  changeTimeout(event, value) {
    this.setState({
      timeout: value,
    });
  }

  render() {
    return (
      <Carousel
        className="Example"
        autoPlay={this.state.autoPlay}
        animation={this.state.animation}
        indicators={this.state.indicators}
        timeout={this.state.timeout}
        cycleNavigation={this.state.cycleNavigation}
        navButtonsAlwaysVisible={this.state.navButtonsAlwaysVisible}
        navButtonsAlwaysInvisible={this.state.navButtonsAlwaysInvisible}
        next={(now, previous) =>
          console.log(
            // `Next User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
        prev={(now, previous) =>
          console.log(
            // `Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
        onChange={(now, previous) =>
          console.log(
            // `OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`
          )
        }
      >
        {items.map((item, index) => {
          return <Banner item={item} key={index} />;
        })}
      </Carousel>
    );
  }
}

export default BannerExample;