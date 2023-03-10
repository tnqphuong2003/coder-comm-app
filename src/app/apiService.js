import axios from "axios";
import { BASE_URL } from "./config";

const apiService = axios.create({
  baseURL: BASE_URL,
});

apiService.interceptors.request.use(
  (request) => {
    console.log(apiService.baseURL);
    console.log("Start Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", { error });
    return Promise.reject(error);
  }
);
apiService.interceptors.response.use(
  (response) => {
    console.log("Response", response);
    return response;
  },
  function (error) {
    // console.log("REPONSE ERROR", { error });
    // return Promise.reject(error);

    console.log("REPONSE ERROR", { error });
    const message = error.response?.data?.errors?.message || "Unknow error";
    return Promise.reject({ message });
  }
);
export default apiService;
