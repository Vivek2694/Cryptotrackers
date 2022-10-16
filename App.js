import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './coin';

function App() {
  const[coins, setCoins] = useState([]);
  const[search, setSearch] = useState('')

 useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=50&page=1&sparkline=false')
  .then(res =>{
    setCoins(res.data);
  })
  .catch(error => console.log(error));
 } ,[]) ;

const handlechange = e => {
  setSearch(e.target.value)
}

// const filteredcoins = coins.filter(coin =>
//   coin.name.toLowerCase().includes(search.toLowerCase())
//   )
const filteredCoin = coins.filter(coin => {
  coin.name.toLowercase().includes(search.toLowerCase());
  })
  

  return (
   <div className='coin-app'>
    <div className="coin-search">
      <h1 className='coin-text'>Search a currency</h1>
      <form>
        <input type="text"  
        placeholder='search' 
        className='coin-input'
        onChange={handlechange}
        />
      </form>
    </div>
   {filteredCoin.map(coin =>{
    return(
      <Coin
       key={coin.id}
       id={coin.id}
       name={coin.name} 
       image={coin.image}
       symbol={coin.symbol}
       volume={coin.market_cap}
       price={coin.current_price}
       priceChange={coin.price_change_percentage_24h}
       marketcap={coin.total_volume}
       />
    );
   })}

   </div>
  );
}

export default App;
