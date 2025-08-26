import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import axiosBaseURL from "../util/axiosBaseURL";

function CreatePage() {
  const initilizeNotesDetails = {
    title: "",
    description: "",
  };
  const [notesDetails, setNotesDetails] = useState(initilizeNotesDetails);

  const handleFormInput = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    if (key === "description") {
      return setNotesDetails((prev) => ({ ...prev, description: value }));
    }
    if (key === "title") {
      return setNotesDetails((prev) => ({ ...prev, title: value }));
    }
  };

  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axiosBaseURL.post(`/notes`, {
        title: notesDetails.title,
        description: notesDetails.description,
      },{
        headers : {
          Authorization : `Bearer ${sessionStorage.getItem("token")}`
        }
      });
      toast.success("form submitted successfully", {
        position: "top-right",
        duration : 800
      });

      setNotesDetails(initilizeNotesDetails);
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error) {
      toast.error("Failed to add Notes in Database", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center  ">
      <div className="max-w-3xl flex-1 px-6 py-12 mx-auto bg-[#181212]">
        <Link
          to={"/home"}
          className=" font-medium text-slate-400 flex justify-start gap-1.5 items-center"
        >
          <FaArrowLeftLong /> Back to Notes
        </Link>

        <form
          className="text-slate-200 gap-4 flex flex-col w-9/12 mx-auto"
          action="#"
          method="POST"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-3xl font-semibold my-6">Create New Note</h1>

          <div className="flex flex-col">
            <label className="text-xl text-slate-300 font-medium" htmlFor="">
              Title
            </label>
            <input
              value={notesDetails.title}
              type="text"
              name="title"
              placeholder="enter your title"
              required
              onChange={handleFormInput}
              className="border border-slate-500 px-2 py-1 rounded-md focus:outline-none placeholder:font-normal"
            />
          </div>

          <div>
            <label className="text-xl text-slate-300 font-medium" htmlFor="">
              Description
            </label>
            <textarea
              value={notesDetails.description}
              className=" w-full min-h-36 max-h-40 border border-slate-500 px-2 py-1 rounded-md focus:outline-none placeholder:font-normal"
              name="description"
              placeholder="enter your description here"
              required
              onChange={handleFormInput}
            />
          </div>

          <button
            type="submit"
            className=" w-fit ml-auto flex gap-1.5 items-center justify-center bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            Create Note
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default CreatePage;
