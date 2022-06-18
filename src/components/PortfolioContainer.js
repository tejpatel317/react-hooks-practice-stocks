import React from "react";
import Stock from "./Stock";

function PortfolioContainer({portfolio, onStockClick}) {

  const compPortStocks = portfolio.map((stock) => {
    return <Stock key={stock.id} stock={stock} onStockClick={onStockClick}/>
  })

  return (
    <div>
      <h2>My Portfolio</h2>
      {
        compPortStocks
      }
    </div>
  );
}

export default PortfolioContainer;
