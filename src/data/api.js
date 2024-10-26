import { CONFIG } from "./config";
import { APIWrapper } from "./api_wrapper";
class APIHandler {
    constructor() {
        this.auth = new APIWrapper({
            baseUrl: CONFIG.API.AUTH,
        });
    }
    setSystemToken = (token) => {
        this.auth.systemToken = token;
    }
}
export const API = new APIHandler();