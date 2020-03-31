import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../assets/firebase";
import TasksComponent from "../content/TasksComponent";
import { StyleSheet, css } from "aphrodite/no-important";
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

const TasksTrackerComponent = () => {
  return (
    <>
      <TasksComponent />
    </>
  );
};

export default TasksTrackerComponent;

const renderIf = ({ conditional, children }) => {
  if (conditional) {
    return children;
  }
};
