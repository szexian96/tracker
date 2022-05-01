# 1. npm install for this website

```
npx create-react-app [app-name]
npm i react-router-dom@v5
npm i axios #api
npm i material-ui-icon
npm update (if missing dependecies)
npm i react-alice-carousel
```

- if you want all file contain the context just write it at `index.js`
- 两种 routing 的方式
  - React Hook
  - React Router

# 2. API Calling + State Management

1. fetchTredingCoins function

```
fetchTrendingCoins = async function (
    {data} = await.get(TrendingCoin(currency))

#{data} better than (data.data)
# if using {} we will no need to destructuring it.
# 直接从object里抽出所有的东西

setTrending(data);

)
# TrendingCoins : api data store place
# currency : variable that will change
```

2. useState (State Management)

```
const [trending,SetTrending] = useState([]);
```

3. useEffect

```
useEffect(() => {
    fetchTrendingCoins (); //callout function
},[currency] //return with the currency
)
```

# 3. UseStyles, MakeStyles (MaterialUI)

```
const useStyles = makeStyles (() => ({
    part_name : {
        ....
        ....
        title : data
        ....
    }
}))
```

- inside return function

```
# callout
const classes = useStyles();
# use
<div classname={classes.part_name}>
```

# 4. react-router-dom

```
# routing
import { BrowserRouter, Route, useHistory} from 'react-router-dom';

<BrowserRoute>
<Route path = "/" component={HomePage} exact/>
</BrowserRoute>

# exact : homepage 指定

# use
onclick = { () => history.push("/")}; //push back to homepage
```

# 5. Carousel Items

- regex expression
- Link for react-router-dom
- Optimal Chaining
- JavaScript, mapping

## Function number with commas (1,000,000)

- [Check Here for regex](https://regexr.com/)

```
function numberWithCommas(x){
    return x.toString.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
```

- the main function is searching your string and put a marker where it's finds 3 consecutive digits.
- not a lot decimal place then ok.

## Optional Chaining (JavaScript)

- enables you to read the value of a property located deep within a chain of connected object without having to check.
- if don't have the value, it will return `undefined`

Example 1

```
const adam{
    name:'Alice'
    cat:{
        name:'Dinah'
    }
}

const dogName = adam.cat?.name #optional chaining

console.log(dogName)
```

Example 2

```
# fetching coin

{coin?.name} == coin && coin.name

# check if coin is undefined or not to avoid any rendering error
```

## loop coin in items use API value

- `trending` store all the needed data in it
- `coin` value is inside trending data : paramenter

```
# useState
const items = trending.map((coin) => {
        let profit = coin.price.change_percentage_24h >= 0;
    }

    return(
        <Link className={classes.carouselItem}
        to = {`/coins/${coin.id}>
        <img
            src = {coin?.image}
            alt = {coin.name}
            height = "80"
            style = {{
                ~
            }}>
    )
)
```
# Currency and Crpyto Symbol & price profit percentage

```
<span style = {{.....}}>
    {coin?.symbol}
    &nbsp;
    <span
        style ={{
            color: profit > 0? "green":"red" #if yes then green, if no then red
        }}>
        {profit && "+"}{coin?.price_change_percentage_24h.toFixed(2)}%
    </span>
</span>

// price with currency
<span style = {{....}}>
    {symbol}{numberWithCommas(coin.current.price.toFixed(2))}
</span>
</Link>

```

# 