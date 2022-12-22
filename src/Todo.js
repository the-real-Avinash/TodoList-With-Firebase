import React, { useState } from "react";
import "./Todo.css";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Box,
  Typography,
  Button,
  Input,
} from "@mui/material";
import db from "./firebases";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
// import { makeStyles } from "@material-ui/core/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Todo = (props) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState();

  const updateTodo = () => {
    db.collection("todo").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            You sure you want to update!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Input
              placeholder={props.todo.todo}
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </Typography>
          <Button onClick={updateTodo}>Update Todo</Button>
        </Box>
      </Modal>
      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText
            primary={props.todo.todo}
            secondary="Dummy Deadline : ⏰"
          ></ListItemText>
        </ListItem>
        <Button variant="contained" onClick={(e) => setOpen(true)}>
          <EditIcon />
        </Button>
        <DeleteForeverIcon
          onClick={(event) => db.collection("todo").doc(props.todo.id).delete()}
        />
      </List>
    </>
  );
};

export default Todo;
