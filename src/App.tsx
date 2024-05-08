import React, { Component } from 'react';
import Modal from './Components/Modal';
import axios from 'axios';
import './App.css';

type Props = {};

type Item = {
  'id': string,
  'title': string,
  'description': string,
  'owner': string,
  'created_at': Date,
};
interface AppState {
  activeItem: Item,
  patchList: Array<Item>,
  modal: boolean
};

function newItem(): Item {
  return {
    'id': '',
    'title': '',
    'description': '',
    'owner': '1',
    'created_at': new Date(),
  };
}

class App extends Component<Props, AppState> {
    constructor(props: Props) {
      super(props);

      this.state = {
        activeItem: newItem(),
        patchList: [],
        modal: false,
      };
    }
    componentDidMount() {
      this.refreshList();
    };

    refreshList = () => {
      axios
        .get('http://localhost:8000/api/patches/')
        .then((res) => this.setState({ patchList: res.data }))
        .catch((err) => console.log(err));
    };

    toggle = () => {
      this.setState({ modal: !this.state.modal });
    };

    handleSumbit = (item: Item) => {
      this.toggle();
      if (item.id) {
        axios
          .put(`http://localhost:8000/api/patches/${item.id}/`, item)
          .then((res) => this.refreshList());
        return;
      };
      axios
        .post("http://localhost:8000/api/patches/", item)
        .then((res) => this.refreshList());
    };

    handleDelete = (item: Item) => {
      alert("delete" + JSON.stringify(item));
      axios
        .delete(`http://localhost:8000/api/patches/${item.id}/`)
        .then((res) => this.refreshList());
    };

    createItem = () => {
      this.setState({ activeItem: newItem(), modal: !this.state.modal });
    };

    editItem = (item: Item) => {
      this.setState({ activeItem: item, modal: !this.state.modal });
    };

    renderItems = () => {
      return this.state.patchList.map((item: Item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <span
            className={`patch-title mr-2`}
            title={item.description}
          >
            {item.title}
          </span>
          <span>
            <button onClick={() => this.editItem(item)} className="btn btn-primary mr-2">Edit</button>
            <button onClick={() => this.handleDelete(item)} className="btn btn-danger">Delete</button>
          </span>
        </li>
      ));
    };

    render() {
      return (
        <main>
          <h1 className='text-success text-uppercase text-center my-4'>PatchHelper</h1>
          <div className='grid grid-cols-2'>
            <div className=''>
              <div className='card p-3'>
                <button onClick={this.createItem} className='btn btn-info'>
                  Add Patch
                </button>
              </div>
              {this.renderItems()}
            </div>
          </div>
          {this.state.modal ? (
            <Modal 
              activeItem={this.state.activeItem}
              active={this.state.modal}
              toggle={this.toggle}
              onSave={this.handleSumbit}
            />
          ) : null}
        </main>
      );
    };
}

export default App;
