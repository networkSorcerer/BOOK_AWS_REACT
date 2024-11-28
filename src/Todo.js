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
    item.don = e.target.checked;
    editItem(item);
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
