import axios, { AxiosResponse } from "axios";

const QUERY_URL = "https://jsonplaceholder.typicode.com";

class QueryService {
  getAllData(): Promise<AxiosResponse> {
    return axios.get(`${QUERY_URL}/users`);
  }
}

export default new QueryService();
