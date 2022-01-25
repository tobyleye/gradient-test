import axios from "axios";

const client = axios.create({
  baseURL: "https://gradient-test.herokuapp.com/api/v1",
});

client.setToken = function (token) {
  if (token) {
    this.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default client;
