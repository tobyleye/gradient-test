import axios from "axios";

const client = axios.create({
  baseURL: "http://192.168.0.119:3000/api/v1",
});

client.setToken = function (token) {
  if (token) {
    this.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

export default client;