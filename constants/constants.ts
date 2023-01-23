const dev = process.env.NODE_ENV === "development";
export const BACKEND_URL = dev ? "http://localhost:3000" : "COMPLETE AFTER";

export const BACKEND_URL_API = BACKEND_URL + "/api";

class Router {
  tasksControllerAPI = "/tasks.controller";
}
export const ROUTER = new Router();
