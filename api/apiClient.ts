import { AxiosRequestConfig } from "axios";
import { apiEndpointURL } from "../config";

export const endpointURL = apiEndpointURL;
export const defaultRequestConfig: AxiosRequestConfig = { baseURL: endpointURL };
