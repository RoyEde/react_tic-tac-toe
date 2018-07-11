import React from 'react'
import { Square, SquareContent } from './styled';

export default ({ handleClick, value }) => (
  <Square onClick={handleClick} value={value}>
    <SquareContent>{value/*TODO add this refactor: ? 'X' : 'O'*/}</SquareContent>
  </Square>
)

      //<button
        //onClick={() => this.handleClick()}
        //className={`square btn ${value}`}
      //>
        //<span className={`${value ? 'appear-quick' : 'hidden'}`}>{ value }</span>
      //</button>
