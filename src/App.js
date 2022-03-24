import "./App.css";
import { BrowserRouter, Route } from "react-router-dom"; //link between page use router
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core";

//if cannot start react, just 'npm start' becuase the data is insde package.json
//material-ui with a makeStyles callback function and get a return value
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />{" "}
        {/*path for homepage and components that will be use this is page*/}
        {/*exact path to get rid the page which will not show on other place*/}
        <Route path="/coins/:id" component={CoinPage} />{" "}
        {/*path for coins column id for coins*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
