"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const NoSSRComponent = dynamic(() => import("./HomePage"), {
  ssr: false,
});

export default function Home() {
  return <NoSSRComponent />;
}
