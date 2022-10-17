import React ,{useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import Coin from './coin';

function App() {
  const[coins, setCoins] = useState([]);
  const[serachResults, setSearchResults] = useState([]);
  const[showResults, setShowResults] = useState(false);
  const[selectedCoin, setSelectedCoin] = useState(null);

 useEffect(() => {
  axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=GBP&order=market_cap_desc&per_page=50&page=1&sparkline=false')
  .then(res =>{
    setCoins(res.data);
  })
  .catch(error => console.log(error));
 } ,[]) ;

const handlechange = e => {
  setShowResults(!showResults);
  let filteredCoins =  coins.filter(i => i.name.toLowerCase().includes(e.target.value.toLowerCase()));
  setSearchResults(filteredCoins);
}

const handleSelect = selectedCoin => {
  setShowResults(!showResults);
  setSelectedCoin(selectedCoin);
}
  
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
      {showResults && serachResults.map((i,j) => {
        return(
          <div key={j} onClick={() =>handleSelect(i)} className='search-result'>
            <p className='search-result-item'>{i.name}</p>
          </div>
        )
      })}
    </div>
   { selectedCoin && 
      <Coin
       key={selectedCoin.id}
       id={selectedCoin.id}
       name={selectedCoin.name} 
       image={selectedCoin.image}
       symbol={selectedCoin.symbol}
       volume={selectedCoin.market_cap}
       price={selectedCoin.current_price}
       priceChange={selectedCoin.price_change_percentage_24h}
       marketcap={selectedCoin.total_volume}
       />
    }
   </div>
  );
}

export default App;
