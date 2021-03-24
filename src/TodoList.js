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
  cursor: pointer;
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
          <Submit type="submit">제출</Submit>
        </Form>
        <ListBox>
          <Title>To do List</Title>
          <List>
            {todoList.map((item) => (
              <Item key={ids.generate()}>
                {item}{" "}
                <BtnBox>
                  <ItemBtn type="button">완료</ItemBtn>
                  <ItemBtn type="button">삭제</ItemBtn>
                </BtnBox>
              </Item>
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
