import React from "react";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite";
import appHistory from "../../assets/history";
import SidebarComponent from "../sidebar/SidebarComponent";

export const styles = StyleSheet.create({
  container: {
    height: "100%",
    minHeight: "100vh"
  },
  content: {
    marginTop: 54
  },
  mainBlock: {
    backgroundColor: "#F7F8FC",
    padding: 30
  }
});

export default function Container({ children, selectedItem }) {
  return (
    <Row className={css(styles.container)}>
      <SidebarComponent
        selectedItem={selectedItem}
        onChange={selectedItem => {
          var location = "/" + selectedItem;
          appHistory.push(location);
        }}
      />
      {children}
    </Row>
  );
}
