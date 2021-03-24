import React from "react";
import styled from "styled-components";
import ids from "short-id";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 40vw;
  min-width: 20rem;
  height: 4rem;
  padding: 0.5rem 1.5rem;
  border: 0.2rem solid #38ada9;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  outline: none;
  &:focus {
    border-color: #eb2f06;
  }
`;

const Submit = styled.input`
  width: 10vw;
  min-width: 10rem;
  height: 4rem;
  box-sizing: border-box;
  color: white;
  background-color: #38ada9;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    background-color: #eb2f06;
  }
  &:focus-within {
    background-color: #eb2f06;
  }
`;

const ListBox = styled.div`
  width: 50vw;
  min-width: 30rem;
`;

const Title = styled.h3``;

const List = styled.ul``;

const Item = styled.li``;

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.state = {
      value: "",
      todoList: [],
      finishedList: [],
    };
  }

  saveLocalStorage = (newList) => {
    localStorage.setItem("Todo", JSON.stringify(newList));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { value, todoList } = this.state;
    if (value !== "") {
      const newList = todoList.slice(0);
      newList.push(value);
      this.setState({
        value: "",
        todoList: newList,
      });
      this.saveLocalStorage(newList);
    }
  };

  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      value,
    });
  };

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
          <Submit type="submit" value="제출" />
        </Form>
        <ListBox>
          <Title>To do List</Title>
          <List>
            {todoList.map((item) => (
              <Item key={ids.generate()}>{item}</Item>
            ))}
          </List>
        </ListBox>
        <ListBox>
          <Title>Finished!</Title>
          <List></List>
        </ListBox>
      </Container>
    );
  }
}

export default Todolist;
