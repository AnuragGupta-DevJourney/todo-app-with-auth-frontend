import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { BiSolidEdit } from "react-icons/bi";
import { RiDeleteBinFill } from "react-icons/ri";
import RateLimit from "../components/RateLimit";
import axios from "axios";
import { data, Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import formateCreatedDate from "../util/formatCreatedDate";
import toast, { Toaster } from "react-hot-toast";
import axiosBaseURL from "../util/axiosBaseURL";
import NotesNotFound from "../components/NotesNotFound";

function HomePage() {
  const navigate = useNavigate();

  const [isRateLimitExceed, setIsRateLimitExceed] = useState(false);
  const [notesData, setNotesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNotesData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axiosBaseURL.get(`/notes`, {
        headers: {
          Authorization: `Bear ${token}`,
        },
      });
      const data = await response.data;
      setNotesData(data);
      // console.log("Database data", data);
      setIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        sessionStorage.clear("token");
        navigate("/login", { replace: true });
      }

      if (error.status === 429) {
        setIsRateLimitExceed(true);
        setIsLoading(false);
        setNotesData([]);
      } else {
        console.log("Error in fetching data", error.message);
      }
    }
  };

  useEffect(() => {
    fetchNotesData();
  }, []);

  const handleDeleteNote = async (id) => {
    // console.log(id)
    try {
      const response = await axiosBaseURL.delete(`/notes/${id}`);
      // console.log("delet response",response)
      toast.success("Note Deleted Successfully", {
        position: "top-right",
        duration: 800,
      });

      fetchNotesData();
    } catch (error) {
      console.log("failde to delete notes", error);
      toast.error("Failed to delete Note");
    }
  };

  const handleIsNotesComplete = async (id, isCompleted) => {
    // console.log(isCompleted);
    try {
      const response = await axiosBaseURL.put(`/notes/${id}`, {
        isCompleted: !isCompleted,
      });
      await fetchNotesData();
      if (isCompleted === false) {
        toast.success("Congrate! You did it. ✅", { duration: 1000 });
      }
    } catch (error) {
      toast.error("Failed to update");
      console.log("failed to update the note complete", error);
    }
    // const filteredNotes = notesData.map((note) => {
    //   if (note._id === id) {
    //     let temp = !note.isCompleted;
    //     temp && toast.success("Congrate! You did it. ✅", { duration: 1000 });
    //     return { ...note, isCompleted: temp };
    //   } else {
    //     return note;
    //   }
    // });

    // setNotesData(filteredNotes);
  };

  return (
    <>
      <Navbar />

      {isRateLimitExceed && <RateLimit />}

      {isLoading && <Loader />}

      <div className="flex gap-4 m-4 justify-evenly flex-wrap items-center h-full ">
        {notesData.length === 0 && isRateLimitExceed === false ? (
          <NotesNotFound />
        ) : (
          notesData.map((note) => {
            // console.log(note.isCompleted);
            return (
              <div
                className="bg-[#181212] basis-80 grow h-fit rounded-md border-l-8 border-blue-500 text-white py-6 px-4"
                key={note._id}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2
                      className={`text-2xl font-semibold capitalize font-poppins ${
                        note.isCompleted ? "line-through opacity-80" : ""
                      }`}
                    >
                      {note.title}{" "}
                    </h2>
                    <p
                      className={`text-gray-300 ${
                        note.isCompleted ? "line-through opacity-50" : ""
                      } `}
                    >
                      {note.description}{" "}
                    </p>
                  </div>

                  <div>
                    <input
                      className="w-5 h-5 cursor-pointer focus:ring-green-600 "
                      style={{
                        accentColor: "#05df72",
                        background: "red !important",
                      }}
                      type="checkbox"
                      name="isNotesCompleted"
                      checked={note.isCompleted}
                      onChange={() =>
                        handleIsNotesComplete(note._id, note.isCompleted)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    {/* <p>CreateadAt : May 13,2025</p> */}
                    <p
                      className={`text-sm text-gray-400 ${
                        note.isCompleted ? "line-through opacity-50" : ""
                      }`}
                    >
                      <span className="text-gray-300 font-normal">CreatedAt: </span>
                      {formateCreatedDate(note.createdAt)}
                    </p>
                    <p
                      className={`text-sm text-gray-400 ${
                        note.isCompleted ? "line-through opacity-50" : ""
                      }`}
                    >
                      <span className="text-gray-300 font-normal">UpdatedAt: </span>
                      {formateCreatedDate(note.updatedAt)}
                    </p>
                  </div>
                  <div className="flex gap-1.5 items-center justify-center">
                    {note.isCompleted ? (
                      ""
                    ) : (
                      <Link
                        to={`/edit/${note._id}`}
                        className={`cursor-pointer text-2xl text-green-400 `}
                      >
                        <BiSolidEdit fontWeight={900} />
                      </Link>
                    )}
                    <button
                      onClick={() => handleDeleteNote(note._id)}
                      className=" cursor-pointer text-2xl text-red-500"
                    >
                      <RiDeleteBinFill fontWeight={900} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}

        <Toaster />
      </div>
    </>
  );
}

export default HomePage;
