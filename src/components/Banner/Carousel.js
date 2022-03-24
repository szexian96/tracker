import { makeStyles } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]); //all the items come from trending state.

  const classes = useStyles();

  const { currency, symbol } = CryptoState(); //get from context api currency and symbolz

  const fetchTrendingCoins = async () => {
    //wait until data come then execute async & await is a pair
    const { data } = await axios.get(TrendingCoins(currency)); //axios is a library to get api into endpoint {currency} ->{data}
    setTrending(data); //put the data into this function and return to useState
    console.log(trending); //track data
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //reference:https://stackoverflow.com/questions/2254185/regular-expression-for-formatting-numbers-in-javascript
  }

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]); //every time currency changes fetch new data

  //trending move to items
  //map is a function, trending is the data which store all the needed data
  const items = trending.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        {/*link to coins with a variable of coin.id*/}
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{
            marginTop: 50,
            marginBottom: 10,
          }}
        />
        <span style={{fontSize: 15, letterSpacing: 2}}>
          {coin?.symbol}
          &nbsp;
          <span 
            style={{
              color: profit > 0? "rgb(14,203,129)" : "red", //css if statement
              fontWeight:500, letterSpacing : 2,fontSize: 15
            }}>
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: 2, lineHeight: 2 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link> /*link the carousel item to a specific link*/
    );
  });

  const responsive = {
    //copy paste for carousell present item
    0: {
      items: 2, //more than 2
    },
    512: {
      items: 4, //lest than 4
    },
  };

  return (
    <div className={classes.carousel}>
      <AliceCarousel //check documentation
        mouseTracking //mouse drag
        infinite //infinite loop
        autoPlayInterval={1000} //autoplay 1000 refresh 1sec after will start
        animationDuration={1500} //duration of 1.5s will keep changing
        disableDotsControls // no dot
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      />
    </div>
  );
};

export default Carousel;
