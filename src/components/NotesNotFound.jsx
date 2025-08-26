import React from "react";
import { FaClipboardList } from "react-icons/fa6";
import { LiaNotesMedicalSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function NotesNotFound() {
  return (
    <div className="max-w-4xl bg-[#110d0c] flex flex-col justify-start mt-4 items-center gap-6 px-8 py-4">
      <i className="text-6xl p-7 text-white flex justify-center items-center  rounded-ful bg-slate-900 rounded-full">
        <FaClipboardList />
      </i>
      <h2 className="text-2xl font-semibold text-white">No Notes Yet</h2>
      <p className="text-slate-400 font-poppins">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>
      <Link
        to={"/create"}
        className="flex gap-1 items-center justify-center bg-blue-700 text-white rounded-full px-4 py-2 text-xl font-normal capitalize cursor-pointer"
      >
        <LiaNotesMedicalSolid fontSize={24} />
        creat your first note
      </Link>
    </div>
  );
}

export default NotesNotFound;
