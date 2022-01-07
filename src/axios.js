import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-challenge-b5eb8.cloudfunctions.net/api",
  // 'http://localhost:5001/challenge-b5eb8/us-central1/api',
  // /challenge-b5eb8/us-central1/api' //the api (cloud function) URL
});

export default instance;

//Dev URL of API
//http://localhost:5001/challenge-b5eb8/us-central1/api
