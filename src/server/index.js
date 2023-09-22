import axios from "axios";

const request = axios.create({
  baseURL: "https://64e7a9d7b0fd9648b7903bcd.mockapi.io/",
  timeout: 10000,
})

export default request