import { useState, useEffect } from "react";
import { Listbox } from "@headlessui/react";

const languages = [
  { value: "en", icon: "us-flag.png" },
  { value: "vn", icon: "vn-flag.png" },
];

export default function Dropdown({ setIsChangedLang }) {
  const [lang, setLang] = useState("");

  let l = window.localStorage.getItem("lang");
  if (l === "") l = "en";
  useEffect(() => setLang(l ?? "en"), []);
  useEffect(() => {
    window.localStorage.setItem("lang", lang);
    setIsChangedLang(true);
  }, [lang]);

  return (
    <Listbox as="div" value={lang} onChange={setLang}>
      <Listbox.Button className={classNames("inline-flex items-center gap-2")}>
        <img
          src={languages.filter((v) => v.value === lang)[0]?.icon}
          className="object-contain w-4 h-auto"
        />
        <p className="text-slate-400 text-xs">{lang.toUpperCase()}</p>
        <svg
          fill="rgb(148 163 184)"
          width={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M7,10L12,15L17,10H7Z" />
        </svg>
      </Listbox.Button>
      <Listbox.Options className="px-2 items-center bg-white text-black gap-2 shadow">
        {languages.map((language, index) => (
          <Listbox.Option
            key={index}
            value={language.value}
            disabled={language.value === lang}
            className="hover:bg-gray-100"
          >
            <button type="button" className="flex items-center gap-2">
              <img src={language.icon} className="object-center w-4" />
              {language.value.toUpperCase()}
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
