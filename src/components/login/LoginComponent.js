import { Form, Button, Card } from "react-bootstrap";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase, { firestore, auth } from "../../assets/firebase";
import "./LoginComponent.css";

const LoginComponent = () => {
  var history = useHistory();
  const [error, setError] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const logIn = () => {
    var email = document.getElementById("formBasicEmail").value;
    var password = document.getElementById("formBasicPassword").value;

    auth.signInWithEmailAndPassword(email, password).catch(error =>
      // Handle Errors here.
      setError(error),
      console.log(error.message)
    );
  };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user);
      history.push("/Overview");
      console.log(user.email);
    }
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          placeContent: "center",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          flexDirection: "column",
          padding: "30px"
        }}
      >
        <div style={{ maxWidth: "400px", flexDirection: "column" }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onKeyPress={ev => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    logIn();
                  }
                }}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control style={{ borderColor: error ? "red" : "none" }} type="password" placeholder="Password" />
              {error ? (
                <Form.Text className="text-muted">
                  { error.message }
                </Form.Text>
              ) : (
                <></>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Save my Password"
                onKeyPress={ev => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    logIn();
                  }
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={() => {
                logIn();
              }}
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;

const renderIf = ({ conditional, children }) => {
  if (conditional) {
    return children;
  }
};
