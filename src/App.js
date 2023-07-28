import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Button, Card, Form } from "react-bootstrap";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import CovidData from "./components/CovidData";
import CovidMap from "./components/CovidMap";

function App() {
  
  const [show, setShow] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [index, setIndex] = useState(-1);
  const contact = useSelector((state) => state);
  console.log(contact.data);
  const dispatch = useDispatch();

  const handleCreateContact = () => {
    setShow(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { firstname, lastname };
    console.log(data);
    if (index === -1) {
      console.log("Inside add", index);
      // New contact, add it to the state
      dispatch({ type: "ADD_CONTACT", payload: { data } });
    } else {
      console.log("inside update",index)
      // Existing contact, update it in the state
      dispatch({ type: "UPDATE_CONTACT", payload: { data, index } });
    }
    setFirstname("");
    setLastname("");
  };
  const handleDeleteContact = (index) => {
    // Dispatch an action to remove the contact from the Redux store.
    dispatch({ type: "DELETE_CONTACT", payload: index });
  };
  const handleEditContact = (i) => {
    setShow(true);
    console.log(contact[i].data?.firstname)
    setFirstname(contact[i].data?.firstname);
    setLastname(contact[i]?.data.lastname);
    setIndex(i);
  };

  const handleUpdateContact = () => {
    console.log("this is edit");
    const data = { firstname, lastname, index }; // Include index here
    dispatch({ type: "ADD_CONTACT", payload: data });
  };
  return (
    <>
      {show ? (
        <div>
          <h3 style={{ textAlign: "center", marginTop: "3%" }}>
            {console.log(index)}
            {index ? "Create Contact Screen" : "Edit Contact Screen"}
          </h3>
          <div
            style={{
              border: "2px solid black",
              height: "300px",
              width: "35%",
              marginTop: "3%",
              marginLeft: "34%",
              padding: "1%",
              backgroundColor: "aliceblue"
            }}
          >
            <Form style={{ padding: "46px" }}>
              <Form.Group style={{ display: "flex" }}>
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  style={{
                    width: "71%",
                    marginLeft: "25px",
                    marginBottom: " 25px",
                  }}
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group style={{ display: "flex" }}>
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  style={{
                    width: "71%",
                    marginLeft: "25px",
                    marginBottom: " 25px",
                  }}
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                ></Form.Control>
              </Form.Group>
            </Form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-30px",
              }}
            >
              <h3>Status</h3>
              <div style={{ marginLeft: "42px" }}>
                <input type="radio"></input>
                <label>Active</label>
                <br />
                <input type="radio"></input>
                <label>Inactive</label>
              </div>
            </div>
          </div>
          <button
            style={{ marginLeft: "48%", marginTop: "10px" }}
            type="button"
            onClick={handleSubmit}
          >
            {index ? "Save Contact" : "Save Edited Contact"}
          </button>
        </div> 
      ) : (
        <div>
          <Button
            style={{
              marginLeft: "45%",
              marginTop: "10%",
              backgroundColor: "cadetblue",
            }}
            onClick={handleCreateContact}
          >
            Create Contact
          </Button>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gridGap: "45px",
              gridColumnGap: "35px",
              width: "90%",
              marginTop: "37px",
              marginLeft: "6%",
            }}
          >
            {contact.map((item, index) => {
              console.log(index)
              if ("data" in item) {
                // If 'data' property exists, extract 'firstname' and 'lastname' from it
                const { firstname, lastname } = item.data;
                return (
                  <>
                    {" "}
                    <Card
                      className="cardstyle"
                      style={{ backgroundColor: "aliceblue" }}
                    >
                      <Card.Body>
                        <Card.Title
                          style={{
                            overflow: "hidden",
                            fontSize: "30px",
                            color: "darkblue",
                          }}
                          className="cardTitle"
                        ></Card.Title>
                        <Card.Text
                          className="cardText"
                          style={{
                            fontSize: "10px",
                            overflow: "hidden",
                            color: "blue",
                          }}
                        >
                          <h5 style={{ color: "black" }}>
                            {firstname} {lastname}
                          </h5>
                          <br />
                          <div style={{ padding: "10px" }}>
                            {" "}
                            <Button onClick={() => handleEditContact(index)}>
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteContact(index)}
                              style={{
                                marginLeft: "10px",
                                backgroundColor: "red",
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </>
                );
              } else {
                // If 'data' property does not exist, use 'firstname' and 'lastname' directly from the item
                const { firstname, lastname } = item;
                return (
                  <Card
                    className="cardstyle"
                    style={{ backgroundColor: "aliceblue" }}
                    key={index}
                  >
                    <Card.Body>
                      <Card.Title
                        style={{
                          overflow: "hidden",
                          fontSize: "30px",
                          color: "darkblue",
                        }}
                        className="cardTitle"
                      >
                        {firstname} {lastname}
                      </Card.Title>
                      <Card.Text
                        className="cardText"
                        style={{
                          fontSize: "10px",
                          overflow: "hidden",
                          color: "blue",
                        }}
                      >
                        {/* Add the buttons for editing and deleting */}
                        <div style={{ padding: "10px" }}>
                          <Button onClick={() => handleEditContact(index)}>
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteContact(index)}
                            style={{
                              marginLeft: "10px",
                              backgroundColor: "red",
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                );
              }
            })}
          </div>
          <div>)</div>
        </div>
      )}
      <CovidData/>
      <CovidMap/>
    </>
  );
}

export default App;
