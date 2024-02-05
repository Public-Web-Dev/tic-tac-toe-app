import {useState} from 'react';
export default function Player({initialName,symbol,isActive,onChangeName}){
const [isEditing,setIsEditing]=useState(false);
const [playerName,setPlayerName]=useState(initialName);

function handleEditClick(){
  setIsEditing(editing =>!editing)
  if(isEditing){
    onChangeName(symbol,playerName)
  }
}

  return (
    <li className={isActive?'active':''}>
    <span className='player'>
    {!isEditing?<span className='player-name'>{playerName}</span>:
    <input type='text' required onChange={(event)=>setPlayerName(event.target.value)} value={playerName}/>}
    <span className='player-symbol'>{symbol}</span>
    </span>
    <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
  </li>
  )
}