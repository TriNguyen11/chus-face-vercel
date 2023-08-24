"use client";
import dynamic from "next/dynamic";

const UploadImage = dynamic(() => import("./Uploads"), {
  ssr: false,
});

const Home = () => {
  return (
    <>
      {/* zuno added */}
      <div className="container-lg mx-auto">
        <section className="text-center py-20 space-y-4">
          <p className="text-md">Shop At CHUS</p>
          <div className="flex flex-col md:flex-row  items-center justify-center mt-0">
            <p className="text-[40px] mt-2 ml-[-35%] sm:ml-0">Play With</p>
            <span className="font-bold relative text-[60px] md:text-[50px] ">
              Your Image
              <img
                className="w-6 self-start absolute top-0 right-[-20px]"
                src="hat.png"
              />
            </span>
          </div>
        </section>
        <section className="mt-4">
          <div>
            <div className="mx-auto col-span-7 box-content w-96 h-96 rounded-xl shadow-lg"></div>
          </div>
        </section>
        <section className="text-center py-20 space-x-10">
          <button
            type="button"
            className="text-white bg-blue-400 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Upload Image
          </button>
        </section>
      </div>
      <UploadImage />
    </>
  );
};

export default Home;
