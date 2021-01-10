import React, { Component } from 'react'
import Modal from './components/Modal'

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
      modal: false,
      viewCompleted: false,
      activeItem: {
        title: '',
        description: '',
        completed: false,
      },
      todoList: todoItems,
    }
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
  handleSubmit = item => {
    this.toggle();
    alert("Simpan " + JSON.stringify(item));
  }
  handleDelete = item => {
    alert("Hapus " + JSON.stringify(item));
  }
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  }
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  }
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    } else {
      return this.setState({ viewCompleted: false });
    }
  }
  renderTabList = () => {
    return (
      <div className="my-3 tab-list">
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Aktif
        </span>
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          Selesai
        </span>
      </div>
    );
  }
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Hapus
          </button>
        </span>
      </li>
    ));
  }
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">
          Ayang, ini agenda kamu
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Tambah Agenda
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;
