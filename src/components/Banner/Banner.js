import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

//This value in make styles function will callback another function inside bracket
const useStyles = makeStyles(() => ({
  banner: {
    // backgroundImage: "url(./banner2.jpeg)",
    backgroundColor: "#1f2833",
  },
  bannerContent: {
    height: 480,
    display: "flex",
    flexDirection: "column", // 從上到下
    justifyContent:"center",
    paddingTo: 25,
    justifyContent: "space-around", //space around between element
  },
  tagline: {
    display: "flex",
     height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },

}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          {/*下面小小的字&寫在裡面的就是=，不是：*/}
          <Typography
            variant="h2"
            style={{
              //兩個{{寫你要的東西}},就會是：
              fontWeight: "bold",
              color: "#66fcf1",
              fontFamily: "Roboto",
              marginBottom: 15,
              letterSpacing: 10,
            }}
          >
            TRACKER
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              //兩個{{寫你要的東西}},就會是：
              fontWeight: "bold",
              color: "#c5c6c7",
              fontFamily: "Roboto",
              textTransform: "capitalize",
              letterSpacing: 2,
            }}
          >
            Check your crypto price here
          </Typography>
          <Carousel/>
        </div>
      </Container>
      {/* Variable will put inside {} and put inside a container is a needed*/}
    </div>
  );
};

export default Banner;
