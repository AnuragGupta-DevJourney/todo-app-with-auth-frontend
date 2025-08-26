import React from "react";

function Loader() {
  return (
    <div className="flex  items-center justify-center gap-4 min-h-screen">
      <h1 className="text-3xl font-semibold text-white">Loading</h1>
<span className="loading loading-ring loading-xs text-white "></span>
<span className="loading loading-ring loading-sm text-white "></span>
<span className="loading loading-ring loading-md text-white "></span>
<span className="loading loading-ring loading-lg text-white "></span>
<span className="loading loading-ring loading-xl text-white "></span> text-white 
    </div>
  );
}

export default Loader;
