import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { ITaskObject } from "model/Task";
import dbConnect from "utils/dbConnect";
import { getAllTasks } from "../api/tasks.controller";
import { SingleTask } from "components/SingleTask";
import { BACKEND_URL_API, ROUTER } from "constants/constants";
import Spinner from "components/Spinner";

type PageProps = {
  serverData: ITaskObject[];
  submitForm?: Function;
};

const Form = ({ serverData, submitForm }: PageProps) => {
  const [loading, setLoading] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      //JEST TEST
      await submitForm?.();
      //switch to axios
      const resp = await fetch(BACKEND_URL_API + ROUTER.tasksControllerAPI, {
        body: JSON.stringify(formState),
        method: "POST",
      });

      const value = await resp.json();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [data, setData] = useState<ITaskObject[]>(serverData);

  return (
    <>
      <form className="w-full max-w-sm " onSubmit={handleSubmit}>
        <Link href={"/"}>HOME</Link>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Full Name
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-full-name"
              type="text"
              placeholder="Jane Doe"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-email"
              type="email"
              placeholder="jane@example.com"
              onChange={handleInputChange}
              value={formState.email}
              name="email"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="inline-password"
              type="password"
              placeholder="******************"
              name="password"
              value={formState.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button disabled={loading}>
          {loading ? <Spinner fz="1 rem" /> : "Enviar"}
        </button>
      </form>

      {data.map((task) => {
        return <SingleTask task={task} key={task._id} />;
      })}
    </>
  );
};

//dont fetch your local API inside your getServerSideProps, its like calling your own house from chez toi
//getServerSideProps is called only on first mount
export async function getServerSideProps() {
  await dbConnect();
  const tasks = await getAllTasks();
  //if I dont serialize the mongoose object, Next will throw an error

  //TO OBJECT: method does not recursively convert all nested documents and arrays to plain objects. If you have nested documents or arrays that you need to convert to plain objects, you may need to use additional logic to traverse and convert those nested objects as needed (_id property its an object, so it will throw an Error in next with just this method).
  /*   const serializableTasks = tasks.map((task) => task.toObject<ITask>()); */
  const serializableTasks = JSON.parse(JSON.stringify(tasks));

  const _props: PageProps = { serverData: serializableTasks };
  console.log("getSERVER SIDE PROPS CALLED", serializableTasks);
  return { props: _props };
}
export default Form;
