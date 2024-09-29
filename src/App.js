import { useEffect, useState } from 'react';
import './App.css';
import Todo from './Todo';
import { Container, List, Paper } from '@mui/material';
import AddTodo from './AddTodo';
import { call } from './service/ApiService';

function App() {
const [items, setItems] = useState([]);


// useEffect(() => {
//   const requestOptions = {
//   method: "GET",
//   Headers : {
//     "Content-type" : "application/json"
//   },
// }
// fetch("http://localhost:8080/todo",requestOptions)
// .then((response) => response.json())
// .then((response) => {
//   setItems(response.data);
// },
// (error) =>{}
// )
// },[items]);

// const deleteItem = (item) => {
//   //삭제할 아이템을 찾는다
//   const newItems = items.filter(e=> e.id != item.id);
//   //삭제할 아이템을 제외한 아이템을 다시 배열에 저장한다
//   setItems([...newItems]);
// }

// const editItem = (item) =>{
//   call =("/todo", "PUT", item)
//   .then((response)=>
//   setItems([...items]));
// }

// const addItem = (item) => {
//   item.id = "ID-" + items.length;
//   item.done = false;
//   setItems([...items, item]);
//   console.log("items : ", items);
// }

useEffect(()=>{
  call("/todo","GET", null).then((response)=> setItems(response.data));
},[]);

const addItem =(item)=>{
  call("/todo", "POST", item).then((response) => setItems(response.data));
}

const deleteItem = (item) => {
  call("/todo","DELETE", item).then((response) => setItems(response.data));
}

const editItem =(item)=>{
  call("/todo","PUT", item).then((response)=>setItems(response.data));
}
  let todoItems = 
    items.length > 0 && (
      <Paper style={{margin: 16}}>
        <List>
          {items.map((item) => (
            <Todo item={item} key={item.id} editItem={editItem} deleteItem={deleteItem}/>))}
        </List>
      </Paper>
      );

  return (
    <div className="App">
      <Container maxWidth="md">
        <AddTodo addItem={addItem}/>
      </Container>
      <div className='TodoList'>{todoItems}</div>
    </div>
  );
}

export default App;
