import React, {  createContext, useContext, useState } from "react";
import { useEffect } from "react";
//for React app to effectively produce global variables that can be passed around.
//context provide a way to share values like these between components
//a context is a a state that use for all the project
const Crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("usd"); //this is use state which initial value
  const [symbol, setSymbol] = useState("$"); //second if USD then $
  const [user, setUser] = useState(null); // for user

  useEffect(() => {
    if (currency === "usd") setSymbol("$"); //if currecy OO, then setSymbol = $
    else if (currency === "jpy") setSymbol("￥");
    else if (currency === "myr") setSymbol("RM");
  }, [currency]); //when the variable in [] change, it will run

  return <Crypto.Provider value={{currency,symbol,setCurrency}}>{children}</Crypto.Provider>;
};//return currency,symbol and set Currency to header

export default CryptoContext; //return to index,js

export const CryptoState = () => { // return to header.js
  return useContext(Crypto);//use this context which is a variable called Crypto
};