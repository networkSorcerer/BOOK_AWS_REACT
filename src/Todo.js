import { CheckBox, DeleteOutline } from "@mui/icons-material";
import {
  IconButton,
  InputBase,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";

const Todo = (props) => {
  const [item, setItem] = useState(props.item);
  const [readOnly, setReadOnly] = useState(true);
  const editItem = props.editItem;

  const editEventHandler = (e) => {
    setItem({ ...item, title: e.target.value });
  };

  const turnOnReadOnly = (e) => {
    if (e.key === "Enter" && readOnly === false) {
      setReadOnly(true);
      editItem(item);
    }
  };
  const deleteItem = props.deleteItem;

  const deleteEventHandler = () => {
    deleteItem(item);
  };

  const turnOffReadOnly = () => {
    setReadOnly(false);
  };

  const CheckboxEventHandler = (e) => {
    // 상태를 직접 변경하지 않고, setItem을 사용하여 업데이트
    const updatedItem = { ...item, done: e.target.checked };
    setItem(updatedItem); // 상태 업데이트
    editItem(updatedItem); // 부모 컴포넌트로 변경된 상태 전달
  };
  return (
    <ListItem>
      <CheckBox checked={item.done} onChange={CheckboxEventHandler} />
      <ListItemText>
        <InputBase
          inputProps={{ "aria-label": "necked", readOnly: readOnly }}
          onClick={turnOffReadOnly}
          onKeyDown={turnOnReadOnly}
          onChange={editEventHandler}
          type="text"
          id={item.id}
          name={item.id}
          value={item.title}
          multiline={true}
          fullWidth={true}
        />
      </ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteEventHandler}>
          <DeleteOutline />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
