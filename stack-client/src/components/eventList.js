import React from "react";
import "../App.css";

const initialState = {
  events: [],
};

class eventList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const purl = "/newevent";
    fetch(purl)
      .then((response) => response.json())
      .then((json) => this.setState({ events: json }));
  }

  onBuy(id) {
    localStorage.setItem("itemId", id);
    window.location.href = "/viewnewEvent";
  }

  render() {
    const { events } = this.state;
    return (
      <div className="container">
        <br></br>
        <br></br>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header bg-primary text-white">Events</div>
              <div className="card-body" style={{backgroundColor:"#c6ccc8"}}>
                <table className="table">
                  <tbody>
                    {events.map((my) => (
                      // table for display product details
                      <tr key={my._id}>
                        <td className="tableTh" width="25%">
                          <img
                            width="200px"
                            alt=""
                            src={"/" + my.image}
                            className="img-thumbnail"
                          />
                        </td>
                        <td className="tableTh" width="60%">
                          <h3>{my.name}</h3>
                          <br />
                          <h5>
                            category :{my.category} / Price: Rs.{" "}
                            {my.price}
                          </h5>
                        </td>
                        <td className="tableTh" width="15%">
                          <button
                            type="button"
                            onClick={() => this.onBuy(my._id)}
                            className="btn btn-success"
                          >
                            RESERVE
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
    );
  }
}

export default eventList;
