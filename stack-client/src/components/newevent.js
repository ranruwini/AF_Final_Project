import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";
import axios from "axios";

//define variables
const initialState = {
  id: "",
  name: "",
  nameError: "",
  category: "",
  categoryError: "",
  description: "",
  descriptionError: "",
  price: "",
  priceError: "",
  confirmButton: "ADD",
  categories: [],
  events: [],
  selectedFile: "",
  image: "",
};

class newevent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const url = "/category";
    fetch(url)
      .then((response) => response.json())
      .then((json) => this.setState({ categories: json }));
    const purl = "/newevent";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => this.setState({ events: json }));
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  //update event details
  onChange(id) {
    const url = "/newevent/";
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        const Eve = json.filter((Eve) => Eve._id === id);
        this.setState({
          name: Eve[0]["name"],
          category: Eve[0]["category"],
          price: Eve[0]["price"],
          description: Eve[0]["description"],
          id: Eve[0]["_id"],
          image: Eve[0]["image"],
        });
      });
    this.setState({ confirmButton: "EDIT" });
  }

  //to clear input fields
  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  //for delete products
  onDelete(id) {
    if (window.confirm("Are you sure to delete this record?")) {
      api
        .newEvent()
        .delete(id)
        .then((res) => {
          ButterToast.raise({
            content: (
              <Cinnamon.Crisp
                title="Online Event Planning"
                content="Delete Successful!"
                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                icon={<AssignmentTurnedIn />}
              />
            ),
          });
          this.componentDidMount();
        });
    }
  }

  //for upload an event image
  onChangeHandler = (event) => {
    this.setState(
      {
        selectedFile: event.target.files[0],
        loaded: 0,
      },
      () => {
        const data = new FormData();
        data.append("file", this.state.selectedFile);
        axios.post("/newevent/upload", data, {}).then((res) => {
          this.setState({ image: res.data.filename });
        });
      }
    );
  };

  //function for handle submit button in form
  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      api
        .newEvent()
        .fetchAll()
        .then((res) => {
          const Eve = res.data.filter(
            (newEvent) =>
            newEvent.name === this.state.name &&
            newEvent.category === this.state.category
          );
          if (Eve.length > 0 || this.state.id !== "") {
            if (Eve.length === 0) {
              api
                .newEvent()
                .update(this.state.id, this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Event Planning"
                        content="Event Edited successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.setState(initialState);
                  this.componentDidMount();
                });
            } else if (
              (this.state.id !== "" &&
                Eve[0].name === this.state.name &&
                this.state.category === Eve[0].category) ||
              Eve.length === 0
            ) {
              api
                .newEvent()
                .update(this.state.id, this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Event Planning"
                        content="Event Edited successfully"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.setState(initialState);
                  this.componentDidMount();
                });
            } else {
              ButterToast.raise({
                content: (
                  <Cinnamon.Crisp
                    title="Online Event Planning"
                    content="This Event Already Exists!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<ExtensionSharp />}
                  />
                ),
              });
            }
          } else {
            api
              .newEvent()
              .create(this.state)
              .then((res) => {
                ButterToast.raise({
                  content: (
                    <Cinnamon.Crisp
                      title="Online Event Planning"
                      content="Event Added successfully"
                      scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                      icon={<AssignmentTurnedIn />}
                    />
                  ),
                });
                this.setState(initialState);
                this.componentDidMount();
              });
          }
        });
    }
  };

  //validate form input fields
  validate = () => {
    let nameError = "";
    let priceError = "";
    let categoryError = "";
    let descriptionError = "";
    let imageError = "";

    if (!this.state.name) {
      nameError = "Event Name Cannot Be Blank";
    }

    if (!this.state.image) {
      imageError = "Image Required!";
    }

    if (!this.state.price) {
      priceError = "Price Cannot Be Blank";
    } else if (isNaN(this.state.price)) {
      priceError = "Use only digits!";
    }

    if (!this.state.category) {
      categoryError = "seelect category!";
    }

    if (!this.state.description) {
      descriptionError = "Desciption Cannot Be Blank";
    } 

    if (
      nameError ||
      descriptionError ||
      categoryError ||
      priceError ||
      imageError
    ) {
      this.setState({
        nameError,
        descriptionError,
        categoryError,
        priceError,
        imageError,
      });
      return false;
    } else {
      this.setState({
        nameError,
        descriptionError,
        categoryError,
        priceError,
        imageError,
      });
    }

    return true;
  };

  render() {
    if (localStorage.getItem("userEmail")) {
      const { categories, events } = this.state;
      return (
        <div className="container">
          <br></br>
          <br></br>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="card">
                <div className="card-header bg-primary text-white">Events</div>
                <div className="card-body">
                  {/*form for add event details*/}
                  <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Organizer Name
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={this.state.name}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.nameError}
                        </div>
                      </div>
     
                    </div>


                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Category
                      </label>
                      <div className="col-md-6">
                        <select
                          className="form-control"
                          name="category"
                          onChange={this.handleChange}
                          value={this.state.category}
                        >
                          <option value="">~select~</option>
                          {categories.map((category) => (
                            <option>{category.name}</option>
                          ))}
                        </select>
                        <div style={{ color: "red" }}>
                          {this.state.categoryError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Description
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="description"
                          value={this.state.description}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.descriptionError}
                        </div>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Price
                      </label>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control"
                          name="price"
                          value={this.state.price}
                          onChange={this.handleChange}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.priceError}
                        </div>
                      </div>
                    </div>


                    <div className="form-group row">
                      <label className="col-md-4 col-form-label text-md-right">
                        Image
                      </label>
                      <div className="col-md-6">
                        <input
                          type="file"
                          className="form-control"
                          name="file"
                          onChange={this.onChangeHandler}
                        />
                        <div style={{ color: "red" }}>
                          {this.state.imageError}
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 offset-md-4">
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value={this.state.confirmButton}
                      />
                      <input
                        type="button"
                        className="btn btn-danger"
                        value="Clear"
                        onClick={() => this.onClear()}
                      />
                    </div>
                  </form>
                  <br></br>
                  <div className="x_scroll">
                    {/*table for display product details*/}
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="tableTh">Organizer Name</th>
                          <th className="tableTh">Category</th>
                          <th className="tableTh">Description</th>
                          <th className="tableTh">Price</th>
                          <th className="tableTh">Image</th>
                          <th className="tableTh">Edit</th>
                          <th className="tableTh">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {events.map((event) => (
                          <tr>
                            <td className="tableTh">{event.name}</td>
                            <td className="tableTh">{event.category}</td>
                            <td className="tableTh">{event.description}</td>
                            <td className="tableTh">{event.price}</td>
                            <td className="tableTh">
                              <img
                                width="100px"
                                alt=""
                                src={"/" + event.image}
                                className="img-thumbnail"
                              />
                            </td>
                            <td className="tableTh">
                              <button
                                type="button"
                                onClick={() => this.onChange(event._id)}
                                className="btn btn-success"
                              >
                                Edit
                              </button>
                            </td>
                            <td className="tableTh">
                              <button
                                type="button"
                                onClick={() => this.onDelete(event._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default newevent;
