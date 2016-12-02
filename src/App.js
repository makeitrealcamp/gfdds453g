import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newTask: '',
      tasks: [
        { id: 1, name: "Sacar la ropa", done: false },
        { id: 2, name: "Hacer la cama", done: true },
        { id: 3, name: "Leer un rato", done: false }
      ],
      errors: {
        newTask: false
      }
    }
  }
  validateNewTask() {
    if (this.state.newTask === '') {
      this.setState({
        errors: {
          newTask: true
        }
      })
      return false
    }
    return true
  }
  addTask(event) {
    event.preventDefault()
    if (this.validateNewTask()) {
      let oldTasks = this.state.tasks
      let newTask = {
        id: Math.max(...oldTasks.map(task => task.id)) + 1,
        name: this.state.newTask,
        done: false
      }
      this.setState({
        tasks: [...oldTasks, newTask],
        newTask: ''
      })
    }
  }
  updateTask(event) {
    this.setState({
      newTask: event.target.value,
      errors: {
        newTask: false
      }
    })
  }
  toogleDone(id,event) {
    const newTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.done = !task.done
        return task
      }
      return task
    })
    this.setState({
      tasks: newTasks
    })
  }
  renderTasks() {
    const tasks = this.state.tasks.map((task, index) => {
      return (
        <li
          className={task.done ? 'done' : null}
          key={task.id}
          onClick={this.toogleDone.bind(this, task.id)}>
          {task.name}
        </li>
      )
    })
    return tasks
  }
  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.renderTasks()}
          </ul>
          <form onSubmit={this.addTask.bind(this)}>
          <input className={this.state.errors.newTask ? 'error' : null} type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" value={this.state.newTask} onChange={this.updateTask.bind(this)}/>
          </form>
        </div>
      </div>
    )
  }
}

export default App;
