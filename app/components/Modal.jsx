export default function Modal({ close }) {
  let l;
  if (typeof window !== "undefined") l = window.localStorage.getItem("lang");

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                {l === "en"
                  ? "It's true! Open in external browser for the best experience"
                  : "Mở bằng trình duyệt để có trải nghiệm tốt nhất!"}
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-center pb-6 rounded-b">
              <button
                className="bg-nguyen text-white rounded-full font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={close}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
