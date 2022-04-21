import axios from "axios";
import * as constants from "./constants";
function CallApi(endpoint, method = "GET", body) {
  return axios({
    method: method,
    url: `${constants.API_URL}/${endpoint}`,
    data: body,
  }).catch((err) => {
    console.log(err);
  });
}

export default CallApi;
