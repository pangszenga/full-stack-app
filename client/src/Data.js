// H E L P E R  C L A S S
import React from "react";
import config from "./config";
import { Redirect } from "react-router-dom";
//this is how the client will talk to the API
//create, sign up and authenticate a user

export default class Data {
  //make the GET and POST requests to the REST API
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = config.apiBaseUrl + path;
    //sends a request with the HTTP method
    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    //check if auth required
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.username}:${credentials.password}`
      );
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
    return fetch(url, options);
  }
  //GET req - /users
  async getUser(username, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      username,
      password
    });

    if (response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }
  //POST req - /users
  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
  //POST req - /courses/create
  async createCourse(emailAddress, password, course) {
    const response = await this.api("/courses", "POST", course, true, {
      emailAddress,
      password
    });

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else if (response.status === 401) {
      return <Redirect to="/forbidden" />;
    } else if (response.status === 500) {
      return <Redirect to="/error" />;
    } else {
      throw new Error();
    }
  }
  //PUT req - /courses/:id
  async updateCourse(emailAddress, password, course, id) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {
      emailAddress,
      password
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    } else if (response.status === 401) {
      return null;
    } else if (response.status === 500) {
      return <Redirect to="/error" />;
    } else {
      throw new Error();
    }
  }
  //DELETE req - /courses/delete
  async deleteCourse(emailAddress, password, id) {
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, {
      emailAddress,
      password
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 500) {
      return <Redirect to="/error" />;
    } else {
      throw new Error();
    }
  }
}
