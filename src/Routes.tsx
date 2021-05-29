import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {
  MainViewConnected,
  CreateTopicConnected,
  TopicDetailConnected,
  UpdateTopicConnected,
} from "@app/modules/Topics/pages";
import { ConsumerGroupsView, ConsumerGroupsByTopicView } from "@app/panels";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={MainViewConnected} exact />
        <Route path="/topics" component={MainViewConnected} exact />
        <Route
          path="/topics/:topicName"
          component={TopicDetailConnected}
          exact
        />
        <Route path="/topic/create" component={CreateTopicConnected} />
        <Route
          path="/topics/update/:topicName"
          component={UpdateTopicConnected}
          exact
        />
        <Route path="/consumerGroups" component={ConsumerGroupsView} exact />
        <Route
          path="/topics/consumerGroups/:topicName"
          component={ConsumerGroupsByTopicView}
          exact
        />
      </Switch>
    </Router>
  );
};

export { Routes };
