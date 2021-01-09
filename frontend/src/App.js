// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

const todoItems = [
  {
    id: 2,
    title: 'pulang',
    description: 'magang hari ini telah selesai',
    completed: false,
  },
  {
    id: 3,
    title: 'beli bumbu nasgor',
    description: 'buat nasi sisa kemaren',
    completed: true,
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: todoItems
    };
  }
  displayCompleted = status => {
    if (status) {
      return this.setState({  viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  }
  renderTabList = () => {
    return (
      <div className='my-5 tab-list'>
        <span
          onClick={() => this.displayCompleted(true)}
          className={(this.state.viewCompleted ? 'active' : '')}
        >
          Selesai
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={(this.state.viewCompleted ? '' : 'active')}
        >
          Belum Selesai
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed == viewCompleted
    );
    return newItems.map(item => (
      <li
        key = { item.id }
        className = 'list-group-item d-flex justify-content-between align-items-center'
      >
        <span
          className = { 'todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}' }
          title = { item.description }
        >
          { item.title }
        </span>
        <span>
          <button className = 'btn btn-secondary mr-2'>Ubah</button>
          <button className = 'btn btn-danger'>Hapus</button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className = 'content'>
        <h1 className = 'text-white text-uppercase text-center my-4'>Todo List</h1>
        <div className = 'row'>
          <div className = 'col-md-6 col-sm-10 mx-auto p-0'>
            <div className = 'card p-3'>
              <div className = ''>
                <button className = 'btn btn-primary'>Buat Agenda</button>
              </div>
              { this.renderTabList() }
              <ul className = 'list-group list-group-flush'>
                { this.renderItems() }
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
