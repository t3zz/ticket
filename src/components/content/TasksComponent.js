import React, { setState, useState } from "react";
import { Row } from "simple-flexbox";
import { StyleSheet, css } from "aphrodite/no-important";
import CardComponent from "./CardComponent";
import CheckboxOn from "../../assets/checkbox-on";
import CheckboxOff from "../../assets/checkbox-off";
import { InputGroup, FormControl } from "react-bootstrap";
import firebase, { auth, firestore } from "../../assets/firebase";
import uuidv4 from "../../assets/uuid";
import EditableLabel from "react-inline-editing";

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "#F0F1F7",
    color: "#9FA2B4",
    fontSize: 20,
    padding: 7
  },
  itemTitle: {
    border: 0,
    color: "#252733",
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: "0.2px",
    lineHeight: "20px",
    margin: 0
  },
  itemValue: {
    color: "#9FA2B4"
  },
  greyTitle: {
    color: "#C5C7CD"
  },
  tagStyles: {
    borderRadius: 5,
    cursor: "pointer",
    fontFamily: "Muli",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 11,
    letterSpacing: "0.5px",
    lineHeight: "14px",
    padding: "5px 12px 5px 12px"
  },
  checkboxWrapper: {
    cursor: "pointer",
    marginRight: 16
  }
});

const TAGS = {
  URGENT: { text: "URGENT", backgroundColor: "#FEC400", color: "#FFFFFF" },
  NEW: { text: "NEW", backgroundColor: "#29CC97", color: "#FFFFFF" },
  DEFAULT: { text: "DEFAULT", backgroundColor: "#F0F1F7", color: "#9FA2B4" }
};

class TasksComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { sorted: false, items: [], user: {} };
  }

  userId = () => this.state.user.uid;

  componentDidMount() {
    let set = this;
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        set.setState({ user: authUser });
        console.log("task component" + this.state.user.uid);
        this.fetchTasks();
      }
    });
  }

  fetchTasks = () => {
    this.setState({ items: [] });
    var tasksRef = firestore.collection("tasks");
    var myTasks = tasksRef.where('createdBy', '==', this.state.user.uid);
    var set = this;

    myTasks.onSnapshot(function(querySnapshot) {
      var tasks = [];
      querySnapshot.forEach(function(doc) {
        var task = {
          title: doc.data().title,
          checked: doc.data().checked,
          createdBy: doc.data().createdBy,
          tag: eval(doc.data().tag),
          timestamp: eval(doc.data().timestamp),  
          id: doc.id
        };
        tasks.push(task);
      });
      set.setState({ items: tasks });
    });
  };

  state = {
    items: [],
    user: {},
    sorted: {}
  };

  renderTask = ({ id, title, createdBy, tag }, index) => {
    const taskId = id;
    function canEdit() {
      return createdBy == this.state.user.uid;
    };

    console.log("renderTask id: " + taskId);
    return (
      <Row horizontal="space-between" vertical="center">
        <Row>
          {this.renderCheckbox(index, taskId)}
          {canEdit ? (
            <EditableLabel
              text={title}
              labelClassName={css(styles.itemTitle)}
              inputClassName={css(styles.itemTitle)}
              inputWidth="200px"
              inputHeight="25px"
              inputMaxLength={50}
              labelFontWeight="bold"
              inputFontWeight="bold"
              onKeyPress={(ev, text) => {
                console.log(`Pressed keyCode ${ev.key}`);
                if (ev.key === "Enter") {
                  this.firebaseUpdateTaskTitle(text, taskId);
                  ev.preventDefault();
                }
              }}
              onFocus={text => console.log(text)}
              onFocusOut={text => this.firebaseUpdateTaskTitle(text, taskId)}
            />
          ) : (
            <>
              <span className={css(styles.itemTitle)}>{title}</span>
            </>
          )}
        </Row>
        {this.renderTag(taskId, tag, index)}
      </Row>
    );
  };

  renderTag = (id, { text, backgroundColor, color }, index) => {
    return (
      <Row
        horizontal="center"
        vertical="center"
        style={{ backgroundColor, color }}
        className={css(styles.tagStyles)}
        onClick={() => this.onTagClick(index, id)}
      >
        {text}
      </Row>
    );
  };

  renderCheckbox = (index, taskId) => (
    <div
      className={css(styles.checkboxWrapper)}
      onClick={() => this.onCheckboxClick(index, taskId)}
    >
      {this.state.items[index].checked ? <CheckboxOn /> : <CheckboxOff />}
    </div>
  );

  onCheckboxClick = (index, taskId) => {
    return this.setState(prevState => {
      const items = prevState.items;
      const ref = items[index];
      const oldValue = ref.checked;
      const newValue = !oldValue;
      ref.checked = newValue;
      this.firebaseUpdateTaskComplete(newValue, taskId);
      return { items };
    });
  };

  firebaseUpdateTaskComplete = (checked, taskId) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const _taskRef = firestore.collection("tasks");
    const _taskDoc = _taskRef.doc(taskId);
    _taskDoc.update({
      checked: checked,
      lastUpdated: timestamp
    });
  };

  firebaseUpdateTaskStatus = (ref, taskId) => {
    const id = taskId;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const taskRef = firestore.collection("tasks");
    const taskDoc = taskRef.doc(id);
    taskDoc.update({
      tag: ref.tag,
      lastUpdated: timestamp
    });
  };

  firebaseUpdateTaskTitle = (title, taskId) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const taskRef = firestore.collection("tasks");
    const taskDoc = taskRef.doc(taskId);
    taskDoc.update({
      title: title,
      lastUpdated: timestamp
    });
  };

  firebaseCreateNewTask = (ref, taskId) => {
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const taskRef = firestore.collection("tasks");
    const taskDoc = taskRef.doc(taskId);
    taskDoc.set({
      title: ref.title,
      tag: ref.tag,
      checked: ref.checked,
      createdBy: ref.createdBy,
      creationDate: timestamp,
      lastUpdated: timestamp
    });
  };

  getNextTag = (except = "URGENT") => {
    const tagLabels = ["URGENT", "NEW", "DEFAULT"];
    const tagIndex = (tagLabels.indexOf(except) + 1) % tagLabels.length;
    return TAGS[tagLabels[tagIndex]];
  };

  onTagClick = (index, taskId) => {
    return this.setState((prevState, id) => {
      const items = prevState.items;
      const ref = items[index];
      ref.tag = this.getNextTag(items[index].tag.text);
      this.firebaseUpdateTaskStatus(ref, taskId);
      return { items };
    });
  };

  onAddButtonClick = () =>
    this.setState(prevState => {
      const taskId = uuidv4();
      const items = prevState.items;
      var taskName = document.getElementById("newTask").value;
      var ref;
      if (taskName !== "") {
        ref = {
          title: taskName,
          checked: false,
          tag: TAGS.NEW,
          createdBy: this.state.user.uid,
          id: taskId
        };
      } else {
        ref = {
          title: "New Task", // `Task ${items.length + 1}`,
          checked: false,
          tag: TAGS.NEW,
          createdBy: this.state.user.uid,
          id: taskId
        };
      }
      items.push(ref);
      this.firebaseCreateNewTask(ref, taskId);
      console.log(items)
      return { items };
    });

  renderAddButton = () => (
    <Row
      horizontal="center"
      vertical="center"
      className={css(styles.tagStyles, styles.addButton)}
      onClick={this.onAddButtonClick}
    >
      +
    </Row>
  );

  render() {
    console.log("sorted");
    return (
      <CardComponent
        containerStyles={this.props.containerStyles}
        title="Tasks"
        link={this.state.sorted ? "View all" : "View my Tasks"}
        onLinkClick={() => this.setState({ sorted: !this.state.sorted })}
        subtitle="Today"
        items={[
          <div style={{ minHeight: "400px" }}>
            <Row horizontal="space-between" vertical="center">
              <InputGroup>
                <FormControl
                  id="newTask"
                  ref="newTask"
                  style={{ border: 0, backgroundColor: "transparent" }}
                  className={css(styles.itemTitle, styles.greyTitle)}
                  onKeyPress={ev => {
                    console.log(`Pressed keyCode ${ev.key}`);
                    if (ev.key === "Enter") {
                      this.onAddButtonClick();
                      ev.preventDefault();
                    }
                  }}
                  placeholder="Create new task"
                />
              </InputGroup>
              {this.renderAddButton()}
            </Row>
          </div>,
          ...(this.state.sorted
            ? this.state.items
                .filter(task => (task.checked == false))
                .map(this.renderTask)
            : this.state.items.map(this.renderTask))
        ]}
      />
    );
  }
}

export default TasksComponent;

function sort(array) {
  return array.sort(function(a, b) {
    var x = a.title;
    var y = b.title;
    return x < y ? -1 : x > y ? 1 : 0;
  });
}
