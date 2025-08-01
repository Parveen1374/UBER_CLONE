import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen w-full flex flex-col justify-between pt-8">
        <img
          className="w-16 ml-8"
          src="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoid2VhcmVcL2ZpbGVcLzhGbTh4cU5SZGZUVjUxYVh3bnEyLnN2ZyJ9:weare:F1cOF9Bps96cMy7r9Y2d7affBYsDeiDoIHfqZrbcxAw?width=1200&height=417"
        />
        <div className="bg-white pb-8 py-4 px-4 ">
          <h2 className="text-[30px] font-semibold">Get started with Uber.</h2>
          <Link
            to="/login"
            className="bg-black text-white flex justify-center items-center rounded-lg py-3 mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
