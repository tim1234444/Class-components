import { Component } from 'react';

export default class Counter extends Component<{
  name:string,
  age:string
}> {
  constructor( props :{
    name:string,
    age:string
  }){
    super( props );
  }
  state = {
    name: this.props.name,
    age: +this.props.age,
  };

  handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      name: e.target.value
    });
  }

  handleAgeChange = () => {
    this.setState({
      age: this.state.age + 1 
    });
  };

  render() {
    return (
      <>
        <input
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <button onClick={this.handleAgeChange}>
          Increment age
        </button>
        <p>Hello, {this.state.name}. You are {this.state.age}.</p>
      </>
    );
  }
}
