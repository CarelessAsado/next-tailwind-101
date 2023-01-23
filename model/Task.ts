import mongoose from "mongoose";

export interface ITask extends mongoose.Document {
  value: string;
  checked: boolean;
  createdAt: Date;
  updatedAt: Date;
}
//maybe try to get the return type of .lean or .toObject
export type ITaskObject = Pick<
  ITask,
  "_id" | Exclude<keyof ITask, keyof mongoose.Document>
>;

const taskSchema = new mongoose.Schema<ITask>(
  {
    value: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Task ||
  mongoose.model<ITask>("Task", taskSchema);
