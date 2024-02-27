"use client";

import OTP from "../components/Otp";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OTP onReachEnd={(value) => console.log(value)} />
    </main>
  );
}
