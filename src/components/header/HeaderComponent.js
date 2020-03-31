import React, { useState } from "react";
import { string } from "prop-types";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import IconSearch from "../../assets/icon-search";
import IconBellNew from "../../assets/icon-bell-new";
import appHistory from "../../assets/history";
import firebase, { auth, firestore } from "../../assets/firebase";

const styles = StyleSheet.create({
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 50,
    marginLeft: 14,
    border: "1px solid #DFE0EB"
  },
  container: {
    height: 40
  },
  cursorPointer: {
    cursor: "pointer"
  },
  name: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "20px",
    textAlign: "right",
    letterSpacing: 0.2,
    "@media (max-width: 768px)": {
      display: "none"
    }
  },
  separator: {
    borderLeft: "1px solid #DFE0EB",
    marginLeft: 32,
    marginRight: 32,
    height: 32,
    width: 2,
    "@media (max-width: 768px)": {
      marginLeft: 12,
      marginRight: 12
    }
  },
  title: {
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 24,
    lineHeight: "30px",
    letterSpacing: 0.3,
    "@media (max-width: 768px)": {
      marginLeft: 36
    },
    "@media (max-width: 468px)": {
      fontSize: 20
    }
  },
  iconStyles: {
    cursor: "pointer",
    marginLeft: 25,
    "@media (max-width: 768px)": {
      marginLeft: 12
    }
  }
});

const HeaderComponent = props => {
  const { icon, title, ...otherProps } = props;
  const history = appHistory;
  const [user, setUser] = useState();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user);
      console.log("logged in as: " + user.email);
    }
  });

  return (
    <Row
      className={css(styles.container)}
      vertical="center"
      horizontal="space-between"
      {...otherProps}
    >
      <span className={css(styles.title)}>{title}</span>
      <Row vertical="center">
        {user ? (
          <>
            <div
              className={css(styles.iconStyles)}
              onClick={() => {
                if (user) {
                  history.push("/Search");
                }
              }}
            >
              <IconSearch />
            </div>
            <div
              className={css(styles.iconStyles)}
              onClick={() => {
                if (user) {
                  history.push("/Alerts");
                }
              }}
            >
              <IconBellNew />
            </div>
            <div className={css(styles.separator)}></div>
          </>
        ) : (
          <></>
        )}
        <Row vertical="center">
          {user ? (
            <>
              <span
                className={css(styles.name, styles.cursorPointer)}
                onClick={() => {
                  history.push("/Profile");
                }}
              >
                {user.email}
              </span>
            </>
          ) : (
            <span
              className={css(styles.name, styles.cursorPointer)}
              onClick={() => history.push("/Login")}
            >
              Login
            </span>
          )}
          <img
            src="https://f0.pngfuel.com/png/178/595/black-profile-icon-illustration-user-profile-computer-icons-login-user-avatars-png-clip-art.png"
            alt="avatar"
            onClick={() => {
              if (user) {
                history.push("/Profile");
              }
            }}
            className={css(styles.avatar, styles.cursorPointer)}
          />
        </Row>
      </Row>
    </Row>
  );
};

HeaderComponent.propTypes = {
  title: string
};

export default HeaderComponent;
