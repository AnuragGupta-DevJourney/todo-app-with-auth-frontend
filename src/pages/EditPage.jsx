import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdSaveAs } from "react-icons/md";
import { data, Link, useNavigate, useParams } from "react-router-dom";
import axiosBaseURL from "../util/axiosBaseURL";
import Loader from "../components/Loader";

function EditPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

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
      // console.log(notesDetails);
      const response = await axiosBaseURL.put(
        `/notes/${id}`,
        {
          title: notesDetails.title,
          description: notesDetails.description,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      await toast.success("Note Updated Successfully", {
        duration: 800,
      });
      setNotesDetails(initilizeNotesDetails);
      setTimeout(() => navigate("/home"), 1000);
    } catch (error) {
      console.log("Erro occured in Updated", error);
      toast.error("Failed to update the note");
    }
  };

  const getNotesByID = async () => {
    try {
      const response = await axiosBaseURL.get(`/notes/${id}`);
      const data = response.data.data;
      const { title, description } = data;
      setIsLoading(false);
      setNotesDetails({
        title: title,
        description: description,
      });
    } catch (error) {
      console.log("Failed to get the data", error);
    }
  };

  useEffect(() => {
    getNotesByID();
  }, [id]);

  const handleDeleteNote = async (id) => {
    console.log("id", id);
    try {
      const response = await axiosBaseURL.delete(`/notes/${id}`);
      // console.log("delet response",response)
      toast.success("Note Deleted Successfully", {
        position: "top-right",
        duration: 800,
      });
      setTimeout(() => {
        navigate("/home");
      }, 1200);
    } catch (error) {
      console.log("failde to delete notes", error);
      toast.error("Failed to delete Note");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="min-h-screen bg-black flex items-center  ">
      <div className="max-w-3xl flex-1 px-6 py-12 mx-auto bg-[#181212]">
        <div className="flex justify-between items-center">
          <Link
            to={"/home"}
            className=" font-medium text-slate-400 flex justify-start gap-1.5 items-center"
          >
            <FaArrowLeftLong /> Back to Notes
          </Link>

          <button
            onClick={() => handleDeleteNote(id)}
            className=" w-fit ml-auto flex gap-1.5 items-center justify-center bg-rose-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            <RiDeleteBin5Fill /> Delete Note
          </button>
        </div>

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
            className=" w-fit ml-auto flex gap-1.5 items-center justify-center bg-green-700 text-white rounded-full px-4 py-2 text-xl font-medium cursor-pointer"
          >
            <MdSaveAs fontSize={23} /> Update Note
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default EditPage;
