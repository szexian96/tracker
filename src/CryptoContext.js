import React, { createContext, useContext, useState } from "react";
import { CoinList } from "./config/api";
import axios from "axios";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
//for React app to effectively produce global variables that can be passed around.
//context provide a way to share values like these between components
//a context is a a state that use for all the project
const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("usd"); //this is use state which initial value
  const [symbol, setSymbol] = useState("$"); //second if USD then $
  const [coins, setCoins] = useState([]); //setCoins z
  const [loading, setLoading] = useState(false); //for table loading
  const [user, setUser] = useState(null); // for user initial value is null
  const [alert, setAlert] = useState({
    //message for alert
    open: false,
    message: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);
  //change the add to watchlist button
  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log(coin.data().coins); //check whether is inside watchlist
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  //change the login button
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);

      console.log(user);
    });
  }, []);

  const fetchCoins = async () => {
    // and async
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)); //use api and destructuring { data } and get the currnectno need to write data.data

    setCoins(data); //data receive from api
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "usd") setSymbol("$"); //if currecy OO, then setSymbol = $
    else if (currency === "jpy") setSymbol("￥");
    else if (currency === "myr") setSymbol("RM");

    fetchCoins();
  }, [currency]); //when the variable in [] change, it will run

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        coins,
        loading,
        alert,
        setAlert,
        user,
        watchlist,
      }}
    >
      {children}
    </Crypto.Provider>
  );
}; //return currency,symbol and set Currency to header

export default CryptoContext; //return to index.js

export const CryptoState = () => {
  // return to header.js
  return useContext(Crypto); //use this context which is a variable called Crypto
};
