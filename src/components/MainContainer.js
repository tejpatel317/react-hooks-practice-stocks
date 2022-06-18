import React, {useEffect, useState} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically")
  const [filter, setFilter] = useState("Tech")

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
    .then((r) => r.json())
    .then((stocks) => setStocks(stocks))
  }, [])

  function handleAdd(stock) {
    const checkStock = portfolio.find(
      (portfolioStock) => portfolioStock.id === stock.id
    )
    if (!checkStock) {
      setPortfolio([...portfolio, stock])
    }
  }

  function handleRemove(stock) {
    const newPortfolio = portfolio.filter((portStock) => {
      return portStock.id !== stock.id
    })

    setPortfolio(newPortfolio)
  }

  const sortedStocks = [...stocks].sort((stock1, stock2) => {
    if (sortBy === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name);
    } 
    else {
      return stock1.price - stock2.price;
    }
  });

  const filterStocks = sortedStocks.filter((stock) => {
    return stock.type === filter
  })

  return (
    <div>
      <SearchBar sortBy={sortBy} setSortBy={setSortBy} filter={filter} setFilter={setFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterStocks} onStockClick={handleAdd}/>
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onStockClick={handleRemove}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
