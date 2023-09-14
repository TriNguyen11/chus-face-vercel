import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";

const languages = [
  { value: "EN", icon: "us-flag.png" },
  { value: "VN", icon: "vn-flag.png" },
];

export default function Dropdown({ background }) {
  const [lang, setLang] = useState("");

  useEffect(() => {
    // Perform localStorage action
    const clang = localStorage.getItem("lang");
    setLang(clang ?? "EN");
  }, []);

  return (
    <Listbox as="div" value={lang} onChange={setLang}>
      <Listbox.Button
        className={classNames(
          "inline-flex px-4 py-2 items-center gap-4"
        )}
      >
        <img
          src={languages.filter((v) => v.value === lang)[0]?.icon}
          className="object-contain w-6 h-auto"
        />
        <p className="text-slate-400">{lang}</p>
        <svg fill="rgb(148 163 184)" width={24} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7,10L12,15L17,10H7Z" />
        </svg>
      </Listbox.Button>
      <Listbox.Options className="px-4 py-2 items-center bg-white gap-4 shadow">
        {languages.map((language, index) => (
          <Listbox.Option
            key={index}
            value={language.value}
            disabled={language.value === lang}
            className="hover:bg-gray-100"
          >
            <button type="button" className="flex items-center w-full gap-4">
              <img src={language.icon} className="object-center w-6" />
              {language.value}
            </button>
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
