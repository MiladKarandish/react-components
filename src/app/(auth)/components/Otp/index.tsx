"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { OTPValue } from "./types";
import { toEnglishDigits } from "@/app/utils/numbers";
import styles from "./styles.module.css";

const OTP = () => {
  // Config
  const otpLength = 5;

  // States and Refs
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const [activeInput, setActiveInput] = useState<number>(0);
  const [otpValue, setOtpValue] = useState<OTPValue[]>([
    ...new Array(otpLength).fill("").map((_, i) => ({ id: i, value: "" })),
  ]);

  const activeInputRef = useMemo(() => activeInput, [activeInput]);

  // Events handlers
  const onKeyDown = (e: React.KeyboardEvent) => {
    const key = toEnglishDigits(e.key);

    const exp = /\d/;

    if (exp.test(key)) {
      setOtpValue((prev) => {
        prev[activeInput].value = key;
        return [...prev];
      });

      if (activeInput < otpLength - 1) setActiveInput((prev) => prev + 1);
    } else if (key === "Backspace" && activeInput > 0) {
      setOtpValue((prev) => {
        prev[activeInput].value = "";
        return [...prev];
      });
      setActiveInput((prev) => prev - 1);
    }

    // Move
    if (key === "ArrowLeft" || key === "ArrowRight") {
      let direction = key === "ArrowLeft" ? -1 : 1;

      setActiveInput((prev) => {
        const dist = prev + direction;
        if (dist < 0 || dist > otpLength - 1) return prev;

        return prev + direction;
      });
    }
  };

  const onInputFocus = (id: number) => {
    setActiveInput(id);
  };

  // Focus on input
  useEffect(() => {
    const firstEmpty = otpValue.find((item) => item.value === "");

    if (firstEmpty && firstEmpty.id < activeInputRef)
      setActiveInput(() => firstEmpty.id);

    const target = inputsRef.current[activeInputRef];
    target.focus();
  }, [activeInputRef, otpValue]);

  return (
    <div className="w-full">
      <div className="w-fit flex justify-center items-center gap-2 mx-auto">
        {otpValue.map((item) => (
          <div key={item.id} className="relative overflow-hidden">
            <label
              htmlFor={item.id.toString()}
              className={`${styles["otp-label"]} absolute inset-0 flex justify-center items-center animate-ping`}
            >
              {item.value}
            </label>
            <input
              id={item.id.toString()}
              ref={(r) => inputsRef.current.push(r!)}
              className="aspect-square w-10 h-10 rounded-md border-0 border-gray-900 outline-none bg-white text-transparent text-center focus:border"
              defaultValue={item.value}
              onKeyDown={onKeyDown}
              onFocus={() => onInputFocus(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OTP;
