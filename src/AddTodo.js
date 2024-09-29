import { Height } from "@mui/icons-material";
import { Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const AddTodo = (props) => {
    const [ item, setItems] = useState({title:""});
    const addItem = props.addItem;

    // onButtonClick 함수 작성
    const onButtonClick = () => {
        addItem(item);
        setItems({title:""})
    }
    const onInputChange = (e) => {
        setItems({title: e.target.value});
        console.log(item);
    }
    const enterKeyEventHandler =(e)=> {
        if(e.key == 'Enter') {
            onButtonClick();
        }
    }
    return (
        <Grid container style={{marginTop : 20}}>
            <Grid xs={11} md={11} item style={{paddingRight : 16}}>
                <TextField placeholder="Add Todo here" fullWidth
                onChange={onInputChange} 
                onKeyPress={enterKeyEventHandler}
                value={item.title}
                />
            </Grid>
            <Grid xs={1} md={1} item>
                <Button fullWidth style={{height : '100%'}} color="secondary"
                variant="outlined"
                onClick={onButtonClick}>
                    +
                </Button>
            </Grid>
        </Grid>
    )
}
export default AddTodo;