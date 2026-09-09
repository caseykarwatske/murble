"use client"

import { useState } from 'react'
import { sendOTP, verifyOTP } from '../actions.ts'

export default function LoginForm(props) {
  const [step, setStep] = useState(0)
  const [phone, setPhone] = useState("")

  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  async function handlePhoneSubmission(formData) {
    setPhone(formData.get("phone"));

    setSending(true);

    await sendOTP(formData);

    setSending(false);
    setStep(1);
  }

  async function handleCodeSubmission(formData) {
    setVerifying(true); 

    await verifyOTP(phone, formData);

    setVerifying(false);
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      { (step == 0) ? (
        <form className="w-1/2 flex flex-col text-2xl" action={handlePhoneSubmission}>
          <input className="border border-neutral-50 rounded-xl text-center py-2 my-2" name="phone" placeholder="(XXX) XXX-XXXX" required />
          <button className="bg-neutral-50 text-neutral-900 rounded-xl py-2 my-2" name="submit" type="submit">Send Code</button>
        </form>
      ) : (
        <form className="w-1/2 flex flex-col text-2xl" action={handleCodeSubmission}>
          <input className="border border-neutral-50 rounded-xl text-center py-2 my-2" name="otp" placeholder="XXXXXX" required />
          <button className="bg-neutral-50 text-neutral-900 rounded-xl py-2 my-2" name="submit" type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};
