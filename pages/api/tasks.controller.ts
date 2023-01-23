// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Task, { ITask } from "model/Task";
import dbConnect from "utils/dbConnect";

export const getAllTasks = async () => {
  return Task.find<ITask>();
};

// https://nextjs.org/docs/api-routes/introduction
//la new doc explica poco y nada, explicitamente te refiere a la old doc
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  const successfulRes = res.status(200);
  console.log(
    "estamos en API HANDLER EN /task.controller, con method: " + req.method
  );
  switch (req.method) {
    case "GET":
      successfulRes.json({ data: await getAllTasks() });
      break;

    case "POST":
      console.log("estamos en POST");
      console.log(req.body);
      const savedTask = await new Task({
        value: JSON.parse(req.body).name,
      }).save();
      res.status(201).json(savedTask);
      break;
    case "PUT":
      console.log(req.body);
      const { value, checked, _id } = req.body;
      const found = await Task.findById<ITask>(_id);
      if (!found) {
        return res.status(404);
      }
      found.value = value;
      found.checked = checked;

      const saved = await found.save();

      console.log(saved, 888);
      res.status(201).json(saved);
      break;
    default:
      break;
  }
}
