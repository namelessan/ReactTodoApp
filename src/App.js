import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header'
import AddTodo from './components/AddTodo'
import Todos from './components/Todos';
import About from './components/pages/About';
// import uuid from 'uuid';
import axios from 'axios'

import './App.css';

class App extends Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }))
  }

  
  // follow immutable principle of React. 
  // On state changes being new object, not the same object mutated.
  markComplete = (id) => {
    this.setState({ todos: this.state.todos.map(todo => {
      return todo.id !== id ? todo : { ...todo, completed: !todo.completed };
    }) });
  }

  // Toggle complete
  // This change inside of the present state,
  // not create a new state object and replace.
  // markComplete = (id) => {
  //   this.setState({ todos: this.state.todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.completed = !todo.completed
  //     }
  //     return todo;
  //   }) })
  // }

  // Delete Todo
  delTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(res => this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] }));
  }

  //Add Todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }));    
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} 
                markComplete={this.markComplete}
                delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} /> 
          </div>
        </div>
      </Router>
      
    );
  }
};

export default App;
