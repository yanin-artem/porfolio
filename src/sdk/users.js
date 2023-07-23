import axios from "axios";

const registration = (data) => {
  return axios.post("http://localhost:8080/auth/register", {
    email: data.email,
    fullname: data.fullname,
    password: data.password,
  });
};

const authorization = (data) => {
  return axios.post("http://localhost:8080/auth/login", {
    email: data.email,
    password: data.password,
  });
};

export const user = {
  registration,
  authorization,
};
