"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Props, OTPValue } from "./types";
import { toEnglishDigits } from "@/app/utils/numbers";
import styles from "./styles.module.css";

const OTP = ({ onReachEnd }: Props) => {
  // Config
  const otpLength = 5;

  // States and Refs
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const isEndReached = useRef<boolean>(false);
  const [activeInput, setActiveInput] = useState<number>(0);
  const [otpValue, setOtpValue] = useState<OTPValue[]>([
    ...new Array(otpLength).fill("").map(() => ""),
  ]);

  const activeInputRef = useMemo(() => activeInput, [activeInput]);

  // Events handlers
  const onKeyDown = (e: React.KeyboardEvent) => {
    const key = toEnglishDigits(e.key);

    const exp = /\d/;

    if (exp.test(key)) {
      setOtpValue((prev) => {
        prev[activeInput] = key;
        return [...prev];
      });

      if (activeInput < otpLength - 1) setActiveInput((prev) => prev + 1);
    } else if (key === "Backspace" && activeInput > 0) {
      setOtpValue((prev) => {
        prev[activeInput] = "";
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

    if (e.currentTarget.id === inputsRef.current.at(-1)?.id)
      isEndReached.current = true;
    else isEndReached.current = false;
  };

  const onInputFocus = (id: number) => {
    setActiveInput(id);
  };

  // Focus on input
  useEffect(() => {
    const firstEmpty = otpValue.indexOf("");

    if (firstEmpty !== -1 && firstEmpty < activeInputRef)
      setActiveInput(() => firstEmpty);

    const target = inputsRef.current[activeInputRef];

    target.focus();
  }, [activeInputRef, onReachEnd, otpValue]);

  // Callback
  useEffect(() => {
    const isFilled = otpValue.filter((otp) => otp !== "").length === otpLength;

    if (onReachEnd && isFilled && isEndReached.current)
      onReachEnd(Number(otpValue.join("")));
  }, [otpValue, onReachEnd]);

  return (
    <div className="w-full">
      <div className="w-fit flex justify-center items-center gap-2 mx-auto">
        {otpValue.map((item, i) => (
          <div key={i} className="relative overflow-hidden">
            <label
              htmlFor={i.toString()}
              className={`${styles["otp-label"]} absolute inset-0 flex justify-center items-center animate-ping`}
            >
              {item}
            </label>
            <input
              id={i.toString()}
              ref={(r) => inputsRef.current.push(r!)}
              className="aspect-square w-10 h-10 rounded-md border-0 border-gray-900 outline-none bg-white text-transparent text-center focus:border"
              defaultValue={item}
              onKeyDown={onKeyDown}
              onFocus={() => onInputFocus(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OTP;
