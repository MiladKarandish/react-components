"use client";

import Dropdown from "@/components/Dropdown";
import OTP from "../components/Otp";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<string>(null!);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    console.log("Selected option:", option);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OTP onReachEnd={(value) => console.log(value)} />

      <Dropdown
        options={["Option 1", "Option 2", "Option 3"]} // Pass options as an array of strings
        onSelect={handleSelect} // Pass the callback function to handle selection
      />
    </main>
  );
}
