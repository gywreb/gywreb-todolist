import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  ButtonGroup,
  InputGroup,
  ListGroup,
  Badge,
} from "react-bootstrap";

type FormElem = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

const App = (): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [updatedTodo, setUpdatedTodo] = useState<ITodo>();

  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    if (updatedTodo) {
      const modifiedTodo = updatedTodo;
      const newTodos: ITodo[] = [
        ...todos.slice(0, todos.indexOf(modifiedTodo)),
        { text: value, complete: false },
        ...todos.slice(todos.indexOf(modifiedTodo) + 1),
      ];
      setUpdatedTodo(undefined);
      setTodos(newTodos);
    } else {
      addTodo(value);
    }
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [
      ...todos.slice(0, index),
      ...todos.slice(index + 1),
    ];
    setTodos(newTodos);
  };

  const updateTodo = (index: number): void => {
    const updatedItem: ITodo = todos.find(
      (todo) => todos.indexOf(todo) === index
    );
    if (!updatedItem.complete) {
      setValue(updatedItem.text);
      setUpdatedTodo(updatedItem);
    } else alert("This to do is already complete");
  };

  return (
    <Container className="p-4">
      <Row>
        <Col xs={12} className="p-3">
          <h1>Todo List</h1>
          <h6>
            A Simple TodoList App create with React , Typescript , Webpack ,
            Bootstrap
          </h6>
        </Col>
        <Col xs={12}>
          <Form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                onChange={(e) => setValue(e.target.value)}
                value={value}
                placeholder="Add or Update your to do here"
                required
              ></FormControl>
              <InputGroup.Append>
                <Button variant="primary" type="submit">
                  {updatedTodo ? "Update" : "Add"}
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
        <Col className="pt-4">
          <ListGroup>
            {!todos.length ? (
              <ListGroup.Item
                variant="light"
                as="li"
                className="d-flex justify-content-center align-items-center"
              >
                Empty List
              </ListGroup.Item>
            ) : (
              todos.map(({ text, complete }, index: number) => (
                <ListGroup.Item
                  key={index}
                  as="li"
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>
                    <span
                      className="pr-3"
                      style={{
                        textDecoration: complete ? "line-through" : "none",
                      }}
                    >
                      {text}
                    </span>
                    <Badge
                      pill
                      variant={complete ? "success" : "warning"}
                      className="p-2"
                    >
                      {complete ? "Complete" : "Incomplete"}
                    </Badge>
                  </span>

                  <ButtonGroup>
                    <Button
                      variant={complete ? "warning" : "success"}
                      onClick={() => completeTodo(index)}
                    >
                      {complete ? "Undo" : "Done"}
                    </Button>
                    <Button variant="danger" onClick={() => deleteTodo(index)}>
                      Delete
                    </Button>
                    <Button variant="info" onClick={() => updateTodo(index)}>
                      Update
                    </Button>
                  </ButtonGroup>
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
