import React from "react";
import styled from "styled-components";
import ids from "short-id";

const LS_TODO = "Todo";
const LS_FINISHED = "Finished";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  width: 40vw;
  min-width: 20rem;
  height: 5rem;
  padding: 0.5rem 1.5rem;
  border: 0.2rem solid #ff7979;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  font-size: 2rem;
  outline: none;
  &:focus {
    border-color: #eb2f06;
  }
`;

const Submit = styled.button`
  width: 10vw;
  min-width: 10rem;
  height: 5rem;
  box-sizing: border-box;
  background-color: #ff7979;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-size: 1.8rem;
`;

const ListBox = styled.div`
  width: 50vw;
  min-width: 30rem;
`;

const Title = styled.h3`
  height: 3rem;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const List = styled.ul`
  padding: 0 2rem;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;

const ItemBtn = styled.button`
  padding: 0.5rem 1rem;
  margin-left: 1rem;
  border-radius: 0.5rem;
  background-color: #ff7979;
`;

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.loadList = this.loadList.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.deleteFinished = this.deleteFinished.bind(this);
    this.moveToFinished = this.moveToFinished.bind(this);
    this.moveToTodo = this.moveToTodo.bind(this);
    this.state = {
      value: "",
      todoList: [],
      finishedList: [],
    };
  }

  saveLocalStorage = (newList, storageName) => {
    localStorage.setItem(storageName, JSON.stringify(newList));
  };

  moveToFinished = (e) => {
    const { todoList, finishedList } = this.state;
    const li = e.target.parentNode.parentNode;
    const thisObj = todoList.find((obj) => obj.id === li.id);
    const newList = finishedList.slice(0);
    newList.push(thisObj);
    this.deleteTodo(e);
    this.setState({
      finishedList: newList,
    });
    this.saveLocalStorage(newList, LS_FINISHED);
  };

  moveToTodo = (e) => {
    const { todoList, finishedList } = this.state;
    const li = e.target.parentNode.parentNode;
    const thisObj = finishedList.find((obj) => obj.id === li.id);
    const newList = todoList.slice(0);
    newList.push(thisObj);
    this.deleteFinished(e);
    this.setState({
      todoList: newList,
    });
    this.saveLocalStorage(newList, LS_TODO);
  };

  deleteTodo = (e) => {
    const { todoList } = this.state;
    const li = e.target.parentNode.parentNode;
    const newTodoList = todoList.slice(0).filter((obj) => obj.id !== li.id);
    this.setState({
      todoList: newTodoList,
    });
    this.saveLocalStorage(newTodoList, LS_TODO);
  };

  deleteFinished = (e) => {
    const { finishedList } = this.state;
    const li = e.target.parentNode.parentNode;
    const newFinished = finishedList.slice(0).filter((obj) => obj.id !== li.id);
    this.setState({
      finishedList: newFinished,
    });
    this.saveLocalStorage(newFinished, LS_FINISHED);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value, todoList } = this.state;
    if (value !== "") {
      const newList = todoList.slice(0);
      const obj = {
        id: ids.generate(),
        todo: value,
      };
      newList.push(obj);
      this.setState({
        value: "",
        todoList: newList,
      });
      this.saveLocalStorage(newList, LS_TODO);
    }
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      value,
    });
  };

  loadList = () => {
    const loadedTodo = JSON.parse(localStorage.getItem("Todo"));
    const loadedFinished = JSON.parse(localStorage.getItem("Finished"));
    if (loadedTodo) {
      this.setState({
        todoList: loadedTodo,
      });
    }
    if (loadedFinished) {
      this.setState({
        finishedList: loadedFinished,
      });
    }
  };

  componentDidMount() {
    this.loadList();
  }

  render() {
    const { value, todoList, finishedList } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="오늘 할 일을 적어주세요😁"
            onChange={this.handleChange}
            value={value}
          />
          <Submit type="submit">제출</Submit>
        </Form>
        <ListBox>
          <Title>To do List</Title>
          <List>
            {todoList.map((item) => (
              <Item key={item.id} id={item.id}>
                {item.todo}
                <BtnBox>
                  <ItemBtn type="button" onClick={this.moveToFinished}>
                    완료
                  </ItemBtn>
                  <ItemBtn type="button" onClick={this.deleteTodo}>
                    삭제
                  </ItemBtn>
                </BtnBox>
              </Item>
            ))}
          </List>
        </ListBox>
        <ListBox>
          <Title>Finished!</Title>
          <List>
            {finishedList.map((obj) => (
              <Item key={obj.id} id={obj.id}>
                {obj.todo}
                <BtnBox>
                  <ItemBtn type="button" onClick={this.moveToTodo}>
                    취소
                  </ItemBtn>
                  <ItemBtn type="button" onClick={this.deleteFinished}>
                    삭제
                  </ItemBtn>
                </BtnBox>
              </Item>
            ))}
          </List>
        </ListBox>
      </Container>
    );
  }
}

export default Todolist;
