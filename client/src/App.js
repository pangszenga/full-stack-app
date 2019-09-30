import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./styles/global.css";

//import component

import Header from "./components/Header";
import Courses from "./components/Courses";
import CoursesDetail from "./components/CoursesDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";
import Forbidden from "./components/Forbidden";
// import Authenticated from "./components/Authenticated";
import PrivateRoute from "./PrivateRoute";

//import context
import withContext from "./Context";

//contextual components
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
// const AuthWithContext = withContext(Authenticated);
const CourseDetailWithContext = withContext(CoursesDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute
          path="/courses/create"
          component={CreateCourseWithContext}
        />
        <PrivateRoute
          path="/courses/:id/update"
          component={UpdateCourseWithContext}
        />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        {/* <PrivateRoute path="/authenticated" component={AuthWithContext} /> */}
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
