import { BACKEND_URL_API, ROUTER } from "constants/constants";
import { ITaskObject } from "model/Task";
import axios from "axios";

export function updateTask(task: ITaskObject) {
  return axios.put<ITaskObject>(
    BACKEND_URL_API + ROUTER.tasksControllerAPI,
    task
  );
}
