import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'
import {useState} from 'react'
import { WINNING_COMBINATIONS } from './utils/winning-combinations.js'

const PLAYERS= {
  X: "Player 1",
  O: "Player 2",
}

const INITIAL_GAME_BOARD= [
  [null,null,null],
  [null,null,null],
  [null,null,null]
]
function deriveActivePlayer(gameTurns){
  let currentPlayer= 'X';
  if(gameTurns.length>0 && gameTurns[0].player==='X'){
    currentPlayer='O'
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard=[...INITIAL_GAME_BOARD.map(array=>[...array])]; //deep copy

  for(const turn of gameTurns){
    const {square, player} =turn;
    const {row,col}=square;
    gameBoard[row][col]=player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard,players){
  let winner;
  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol= gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol= gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol= gameBoard[combinations[2].row][combinations[2].column];
    if(firstSquareSymbol&&firstSquareSymbol=== secondSquareSymbol&&firstSquareSymbol=== thirdSquareSymbol){
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers]=useState(PLAYERS)
  const [gameTurns,setGameTurns]=useState([])
  const activePlayer= deriveActivePlayer(gameTurns)

 const gameBoard=deriveGameBoard(gameTurns)
 const winner=deriveWinner(gameBoard,players)
 const hasDraw= gameTurns.length===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns(prevTurns=>{
     const currentPlayer=deriveActivePlayer(prevTurns)
      const updatedTurns=[
         {square:{row:rowIndex,col:colIndex},player: currentPlayer},...prevTurns
      ]
      return updatedTurns
    })
  }

function handleRematch(){
  setGameTurns([])
}

function handleSetPlayer(symbol,name){
  setPlayers({
    ...players,
    [symbol]:name
  })
}
  return (
    <main>
      <div id='game-container'>
        <ol id='players'  className='highlight-player'>
         <Player initialName={PLAYERS.X} symbol='X' isActive={activePlayer==='X'} onChangeName={handleSetPlayer} />
         <Player initialName={PLAYERS.O} symbol='O' isActive={activePlayer==='O'} onChangeName={handleSetPlayer}/>
        </ol>
        {(winner||hasDraw )&& <GameOver winner={winner} onRestart={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
