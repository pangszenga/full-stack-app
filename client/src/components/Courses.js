import React, { Component } from "react";
import { Link } from "react-router-dom";
import config from "../config";

export default class Courses extends Component {
  state = {
    data: null,
    isLoading: true
  };

  //if component mounts, grab courses
  componentDidMount() {
    fetch(`${config.apiBaseUrl}/courses`)
      .then(res => res.json())
      .then(res =>
        this.setState(() => {
          if (res.status === 500) {
            this.props.history.push("/error");
          } else {
            return {
              data: res,
              isLoading: false
            };
          }
        })
      )
      .catch(err => {
        this.props.history.push("/error");
      });
  }

  render() {
    let render;

    if (!this.state.isLoading) {
      if (this.state.data.length > 0) {
        render = this.state.data.map(course => {
          return (
            <div key={course.id} className="grid-33">
              <Link
                className="course--module course--link"
                to={`/courses/${course.id}`}
              >
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{course.title}</h3>
              </Link>
            </div>
          );
        });
      }
    } else {
      render = <p>Your courses are loading</p>;
    }

    return (
      <div className="bounds">
        {render}
        <div className="grid-33">
          <Link
            className="course--module course--add--module"
            to="/courses/create"
          >
            <h3 className="course--add--title">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                viewBox="0 0 13 13"
                className="add"
              >
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
              </svg>
              New Course
            </h3>
          </Link>
        </div>
      </div>
    );
  }
}

//retrieve courses
//Course Detail and Create Course
