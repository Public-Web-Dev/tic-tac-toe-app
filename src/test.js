// const Board= [
//   [null,'X',null],
//   [null,'X',null],
//   [null,'X',null]
// ];
// const Board=[
//   ['O',null,null],
//   ['O',null,null],
//   ['O',null,null]
// ];
// const Board= [
//   ['X','X','X'],
//   [null,null,null],
//   [null,null,null]
// ];
const Board= [
  [null,null,null],
  ['X','X','X'],
  [null,null,null]
];
// const Board= [
//   [null,null,'X'],
//   [null,'X',null],
//   ['X',null,null]
// ];
// const Board= [
//   ['O',null,null],
//   [null,'O',null],
//   [null,null,'O'],
// ];




const columns=[0,1,2].map((i)=>{
  return Board.map((arr)=>arr[i])
}).filter(col=>col.every(item=>item==='X'||item==='O'))
console.log('columns: ', columns.length>0,columns.length?columns[0][0]:'')


const rows= Board.filter(row=>row.every(item=>item==='X'||item==='O'))
console.log('rows: ', rows.length>0,rows.length?rows[0][0]:'')

const crossLeft= [Board[0][0], Board[1][1], Board[2][2]].every(item=>item==='X'||item==='O');
const crossRight= [Board[0][2], Board[1][1], Board[2][0]].every(item=>item==='X'||item==='O');

console.log('crossLeft: ', crossLeft, crossLeft?Board[0][0]:'');
console.log('crossRight: ', crossRight, crossRight?Board[0][0]:'');


