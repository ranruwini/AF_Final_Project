import React from "react";
import "../App.css";
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn, ExtensionSharp } from "@material-ui/icons";

// define variables
const initialState = {
  events: [],
 
  confirmButton: "Send",
  
  EveId: "",
  EveName: "",
  EvePrice: "",
  EveDescription: "",
  EveImage: "",
  description: "",
  type: "",
  total: "",
  descriptionError: "",
};

class oneEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleChange = (e) => {
    const isCheckbox = e.target.type === "checkbox";
    this.setState({
      [e.target.name]: isCheckbox ? e.target.checked : e.target.value,
    });
  };

  onClear() {
    this.setState(initialState);
    this.componentDidMount();
  }

  componentDidMount() {
    const purl = "/newevent";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => {
        const Eve = json.filter(
          (Eve) => Eve._id === localStorage.getItem("itemId")
        );
        this.setState({
          events: Eve,
          EveId: Eve[0]["_id"],
          EveName: Eve[0]["name"],
          EvePrice: Eve[0]["price"],
          EveDescription: Eve[0]["description"],
          EveImage: Eve[0]["image"],
        });
      });
  }

  onReserve() {
    if (localStorage.getItem("userEmail")) {
      if (this.state.description) {
        if (this.state.description <= this.state.EveDescription) {
          const total =
             this.state.EvePrice;
          this.setState(
            {
              type: "bookings",
              total: total,
              email: localStorage.getItem("userEmail"),
            },
            () => {
              api
                .newEvent()
                .create(this.state)
                .then((res) => {
                  ButterToast.raise({
                    content: (
                      <Cinnamon.Crisp
                        title="Online Event Planning"
                        content="Event Add Successful!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                      />
                    ),
                  });
                  this.componentDidMount();
                  this.setState(initialState);
                });
            }
          );
        } else {
          this.setState({ descriptionError: "Description Error!" });
        }
      } else {
        this.setState({ descriptionError: "Description Required!" });
      }
    } else {
      ButterToast.raise({
        content: (
          <Cinnamon.Crisp
            title="Online Event Planning"
            content="Please Login to the system!"
            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
            icon={<ExtensionSharp />}
          />
        ),
      });
    }
  }

 


  //Add to reserve form
  render() {
    const { events} = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body " style={{backgroundColor:"#c6ccc8"}} >
                <table className="table ">
                  <tbody>
                    {events.map((bookings) => (
                      <tr>
                        <td className="tableTh" width="35%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + bookings.image}
                            className="img-thumbnail"
                          />
                        </td>
                        <td className="tableTh" width="65%">
                          <h3>{bookings.name}</h3>
                          <br />
                          <h5>
                            category :{bookings.category} 
                          </h5> 
                          <br />
                          <h5>
                             Price: Rs.{" "}
                            {bookings.price}
                          </h5>

                          <br />
                          <h5>Description : {bookings.description}</h5>
                          <br />
                         
                          <br />
                          <br />
                          <button
                            type="button"
                            onClick={() => this.onReserve()}
                            className="btn btn-success"
                          >
                            RESERVE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <hr />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default oneEvent;
