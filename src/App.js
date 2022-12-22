import { useEffect, useState } from "react";
import "./App.css";
import { Button, FormControl, Input, InputLabel } from "@mui/material";
import Todo from "./Todo";
import db from "./firebases";
import firebase from "firebase/compat/app";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //when the app loads , we need to listen to db and fetch new todos as they get added/removed

  useEffect(() => {
    //this code is runs when app.js is load
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        console.log(snapshot.docs.map((doc) => doc.data()));
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (event) => {
    //this will fire after button click
    event.preventDefault(); //will stop refresh
    db.collection("todo").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    // setTodos([...todos, input]);
    setInput(""); //clear up the input after clicking add todo button
  };
  return (
    <div className="App">
      <h1>Hello Avinash : 🚀</h1>
      <form>
        {/* <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        /> */}
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant="contained"
          type="submit"
          onClick={addTodo}
        >
          {" "}
          Add Todo
        </Button>
        {/* <button type="submit" onClick={addTodo}>
          Add Todo
        </button> */}
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
