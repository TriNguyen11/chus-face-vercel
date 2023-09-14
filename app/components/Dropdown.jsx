import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex w-full justify-center items-center gap-x-2 p-2 text-sm font-semibold text-slate-500">
        <img src="us-flag.png" className="object-center w-6" />
        <span>English</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-slate-400"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <title>menu-down</title>
          <path d="M7,10L12,15L17,10H7Z" />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item as="div" className="p-2 inline-flex w-full">
            {({ active }) => (
              <button
                type="button"
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "inline-flex items-center gap-4 w-full"
                )}
              >
                <img src="us-flag.png" className="object-center w-6" />
                English
              </button>
            )}
          </Menu.Item>
          <Menu.Item as="div" className="p-2 inline-flex w-full">
            {({ active }) => (
              <button
                type="button"
                className={classNames(
                  active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                  "inline-flex items-center gap-4 w-full"
                )}
              >
                <img src="vn-flag.png" className="object-center w-6" />
                Vietnamese
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
