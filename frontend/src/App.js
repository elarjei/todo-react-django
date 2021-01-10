import React, { Component } from 'react';
import Modal from './components/Modal';
import axios from "axios";
import Cookies from "js.cookie";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        title: '',
        description: '',
        completed: false,
      },
      todoList: [],
    }
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get('/api/todos/')
      .then(response => this.setState({ todoList: response.data }))
      .catch(err => console.log(err));
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
            {" "}
            Edit{" "}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Hapus{" "}
          </button>
        </span>
      </li>
    ));
  }
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  }
  handleSubmit = item => {
    this.toggle();
    var csrftoken = Cookies.get('csrftoken');
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item, {headers: { 'X-CSRFToken': csrftoken }})
        .then(response => this.refreshList());
      return;
    }
    axios
      .post("/api/todos/", item, {headers: { 'X-CSRFToken': csrftoken }})
      .then(response => this.refreshList());
  }
  handleDelete = item => {
    var csrftoken = Cookies.get('csrftoken');
    axios
      .delete(`/api/todos/${item.id}/`, {headers: { 'X-CSRFToken': csrftoken }})
      .then(response => this.refreshList());
  }
  createItem = () => {
    const item = { title: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  }
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  }
  render() {
    return (
      <main className="content">
        <h1 className="text-black text-center my-4">
          Ayaang, ini agenda kamu 💋
        </h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3 m-2">
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
