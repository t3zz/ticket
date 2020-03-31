import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../assets/firebase";
import { StyleSheet, css } from "aphrodite/no-important";
import UnresolvedTicketsComponent from "../content/UnresolvedTicketsComponent";
import { Column, Row } from "simple-flexbox";

const styles = StyleSheet.create({
  cardsContainer: {
    marginRight: -30,
    marginTop: -30
  },
  cardRow: {
    marginTop: 30,
    "@media (max-width: 768px)": {
      marginTop: 0
    }
  },
  link: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    lineHeight: "20px",
    letterSpacing: "0.2px",
    color: "#3751FF",
    textAlign: "left",
    cursor: "pointer"
  },
  miniCardContainer: {
    flexGrow: 1,
    marginRight: 30,
    "@media (max-width: 768px)": {
      marginTop: 30,
      maxWidth: "none"
    }
  },
  todayTrends: {
    marginTop: 30
  },
  lastRow: {
    marginTop: 30
  },
  unresolvedTickets: {
    marginRight: 30,
    "@media (max-width: 1024px)": {
      marginRight: 0
    }
  },
  tasks: {
    marginTop: 0,
    "@media (max-width: 1024px)": {
      marginTop: 30
    }
  }
});

const TicketsComponent = () => {
  const [error, setError] = useState(false);
  var history = useHistory();

  const [currentUser, setCurrentUser] = useState(undefined);
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setCurrentUser(user);
      console.log(user.email);
    }
  });

  return (
    <>
        <Row
          horizontal="space-between"
          className={css(styles.lastRow)}
          breakpoints={{ 1024: "column" }}
        >
          <UnresolvedTicketsComponent
            containerStyles={styles.unresolvedTickets}
          />
        </Row>
    </>
  );
};

export default TicketsComponent;

const renderIf = ({ conditional, children }) => {
  if (conditional) {
    return children;
  }
};
