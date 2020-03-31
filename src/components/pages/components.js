import React from "react";
import { Column } from "simple-flexbox";
import { css } from "aphrodite";
import Container, { styles } from "../container/container";
import HeaderComponent from "../../components/header/HeaderComponent";
import ContentComponent from "../../components/content/ContentComponent";
import LoginComponent from "../../components/login/LoginComponent";
import TicketsComponent from "../../components/tickets/TicketsComponent";
import TasksTrackerComponent from "../../components/tasks/TaskComponent";

export function Default() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Overview" />
        <div className={css(styles.content)}>
          <ContentComponent />
        </div>
      </Column>
    </Container>
  );
}

export function Tickets() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Tickets" />
        <div className={css(styles.content)}>
          <TicketsComponent />
        </div>
      </Column>
    </Container>
  );
}

export function Tasks() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Tasks" />
        <div className={css(styles.content)}>
          <TasksTrackerComponent />
        </div>
      </Column>
    </Container>
  );
}

export function Settings() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Settings" />
        <div className={css(styles.content)}></div>
      </Column>
    </Container>
  );
}

export function Home() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Home" />
        <div className={css(styles.content)}></div>
      </Column>
    </Container>
  );
}

export function Login() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Login" />
        <div className={css(styles.content)}>
          <LoginComponent />
        </div>
      </Column>
    </Container>
  );
}

export function Profile() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Profile" />
        <div className={css(styles.content)}></div>
      </Column>
    </Container>
  );
}

export function Alerts() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Alerts" />
        <div className={css(styles.content)}></div>
      </Column>
    </Container>
  );
}

export function Search() {
  return (
    <Container>
      <Column flexGrow={1} className={css(styles.mainBlock)}>
        <HeaderComponent title="Search" />
        <div className={css(styles.content)}></div>
      </Column>
    </Container>
  );
}
