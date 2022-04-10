import React, {  createContext, useContext, useState } from "react";
import { CoinList } from "./config/api";
import axios from "axios";
import { useEffect } from "react";
//for React app to effectively produce global variables that can be passed around.
//context provide a way to share values like these between components
//a context is a a state that use for all the project
const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("usd"); //this is use state which initial value
  const [symbol, setSymbol] = useState("$"); //second if USD then $
  const [coins, setCoins] = useState([]); //setCoins z
  const [loading, setLoading] = useState(false); //for table loading
  const [user, setUser] = useState(null); // for user

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

  return <Crypto.Provider value={{currency,symbol,setCurrency, coins, loading}}>{children}</Crypto.Provider>;
};//return currency,symbol and set Currency to header

export default CryptoContext; //return to index,js

export const CryptoState = () => { // return to header.js
  return useContext(Crypto);//use this context which is a variable called Crypto
};