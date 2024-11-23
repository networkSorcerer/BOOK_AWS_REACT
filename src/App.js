import { useEffect, useState } from "react";
import "./App.css";
import Todo from "./Todo";
import {
  Container,
  List,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import AddTodo from "./AddTodo";
import { call, signout } from "./service/ApiService";

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API 호출 후 로딩 상태 변경
    call("/todo", "GET", null)
      .then((response) => setItems(response.data))
      .finally(() => setLoading(false)); // 비동기 처리 완료 후 로딩 상태 변경
  }, []);

  const addItem = (item) => {
    call("/todo", "POST", item).then((response) => setItems(response.data));
  };

  const deleteItem = (item) => {
    call("/todo", "DELETE", item).then((response) => setItems(response.data));
  };

  const editItem = (item) => {
    call("/todo", "PUT", item).then((response) => setItems(response.data));
  };

  // Todo 리스트 렌더링
  let todoItems = items.length > 0 && (
    <Paper style={{ margin: 16 }}>
      <List>
        {items.map((item) => (
          <Todo
            item={item}
            key={item.id}
            editItem={editItem}
            deleteItem={deleteItem}
          />
        ))}
      </List>
    </Paper>
  );

  // 네비게이션 바
  let navigationBar = (
    <AppBar position="static">
      <Toolbar>
        <Grid justifyContent="space-between" container>
          <Grid item>
            <Typography variant="h6">오늘의 할일</Typography>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={signout}>
              로그아웃
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );

  // Todo 리스트 페이지
  let todoListPage = (
    <div>
      {navigationBar}
      <Container maxWidth="md">
        <AddTodo addItem={addItem} />
        <div className="TodoList">{todoItems}</div>
      </Container>
    </div>
  );

  // 로딩 중 페이지
  let loadingPage = <h1>로딩중...</h1>;
  let content = loading ? loadingPage : todoListPage;

  // 선택한 content 렌더링
  return <div className="App">{content}</div>;
}

export default App;
