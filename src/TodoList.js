import React from "react";
import styled from "styled-components";
import ids from "short-id";

const Container = styled.div``;

const Form = styled.form``;

const Input = styled.input``;

const Submit = styled.input``;

const ListBox = styled.div``;

const Title = styled.h3``;

const List = styled.ul``;

const Item = styled.li``;

class Todolist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      todoList: [],
      finishedList: [],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { value, todoList } = this.state;
    const newList = todoList.slice(0);
    newList.push(value);
    this.setState({
      value: "",
      todoList: newList,
    });
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
