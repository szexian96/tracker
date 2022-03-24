import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { CryptoState } from "../CryptoContext";
import { CoinList } from "../config/api";
import axios from "axios";
import {
  Container,
  createTheme,
  ThemeProvider,
  Typography,
  TextField,
  TableContainer,
  LinearProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Pagination from "@material-ui/lab/Pagination";


export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsTable = () => {
  const [coins, setCoins] = useState([]); //setCoins z
  const [loading, setLoading] = useState(false); //for table loading
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1); //initial value
  const history = useHistory();

  const { currency,symbol } = CryptoState(); //for currency state

  const fetchCoins = async () => {
    // and async
    setLoading(true);
    const { data } = await axios.get(CoinList(currency)); //use api and destructuring { data } and get the currnectno need to write data.data

    setCoins(data); //data receive from api
    setLoading(false);
  };

  const darkTheme = createTheme({
    //dark theme provider
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  useEffect(() => {
    fetchCoins(); //everytime got changes then fetchCoins
  }, [currency]);

  //function for Searching in
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) || //search for name
        coin.symbol.toLowerCase().includes(search)||
        coin.name.toUpperCase().includes(search)||
        coin.symbol.toUpperCase().includes(search)//search for symbol
    );
  };

  const useStyles = makeStyles(() => ({
      row: {
          backgroundColor: "#16171a",
          cursor: "pointer",
          "&:hover": {
              backgroundColor: "#131111",
          },
          fontFamily: "Roboto",
      },
      pagination: {
          "& .MuiPaginationItem-root": {
              color: "#66fcf1" //color for root
          },
      },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h5"
          style={{ margin: 18, fontFamily: "Roboto" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Crypto Currency..."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "#66fcf1" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#66fcf1" }}>
                <TableRow >
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontFamily: "Roboto",
                        fontSize: 20
                      }}
                      key={head} //provide key to the map
                      align={head === "Coin" ? "" : "right"} //will provide more space for the head
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>{/*slice from 1-10, 10-20;ike this*/}
                {handleSearch().slice((page - 1) * 10,(page - 1) * 10 + 10).map((row) => {
                  //row is the place to put data
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow 
                    onClick={() => history.push(`/coins/${row.id}`)}
                    className ={classes.row}
                    key = {row.name} //eery row key name
                    >
                      <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgrey" }}>
                              {row.name}
                            </span>
                          </div>
                      </TableCell>
                      <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>
                      <TableCell 
                      align = "right"
                      style = {{
                          color: profit > 0 ? "rgb(14,203,129)": "red",
                          fotWeight : 500,
                      }}
                      >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                          {symbol}{" "}
                          {numberWithCommas(
                              row.market_cap.toString().slice(0,-6))}M
                        </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              {/*The array for all over the filter coin*/}
            </Table>
          )}
        </TableContainer>
        <Pagination
            style = {{
                padding: 20,
                width : "100%",
                display: "flex",
                justifyContent: "center",
            }}
            classes= {{ ul: classes.pagination }} //style
            count = {(handleSearch()?.length / 10).toFixed(0)} //The length of search is divided into 10.
            onChange = {(_,value) => { //take the value and change it  
                setPage(value); //set page to 1,2,3,4,5,6....
                window.scroll(0,450) //to 450pixel
            }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
