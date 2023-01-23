import { ITaskObject } from "model/Task";
import React, { useState } from "react";
import * as taskAPI from "clientAPI/taskAPI";
export const SingleTask = ({ task }: { task: ITaskObject }) => {
  const [checked, setChecked] = useState(task.checked);

  const handleCheckboxChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { data } = await taskAPI.updateTask({
      ...task,
      checked: event.target.checked,
    });
    console.log(data, "SAVED, update REDUX STATE");
    setChecked(data.checked);
  };

  return (
    <div className={`flex gap-5 ${checked && "text-slate-400 line-through"}`}>
      <div>{task.value}</div>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};
