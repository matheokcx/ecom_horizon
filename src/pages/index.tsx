import { useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

export default function Home() {

  const router: NextRouter = useRouter();
  const [mailValue, setMailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [errorMessage, SetErrorMessage] = useState<string>("");

  const connection = async () => {
    const requete = await fetch("/api/auth/connection", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        mailV: mailValue,
        passwordV: passwordValue
      })
    });

    if (requete.ok) {
      router.push(`/dashboard?mail=${mailValue}`);
    }
    else {
      const callBack: any = await requete.json();
      SetErrorMessage(callBack.message);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-black bg-fixed font-sans text-black">
        <div className="w-2/3 h-2/3 rounded-xl bg-opacity-60 flex flex-col items-center justify-center gap-8">
          <h2 className="font-bold text-2xl">LogIn</h2>
          <input type="mail" value={mailValue} onChange={(e: any) => setMailValue(e.target.value)} placeholder="Your mail" className="w-5/6 h-8 rounded-lg p-1 border-1 border-gray-400 bg-white text-black" />
          <input type="password" value={passwordValue} onChange={(e: any) => setPasswordValue(e.target.value)} placeholder="Your password" className="w-5/6 h-8 rounded-lg p-1 border-1 border-gray-400 bg-white text-black" />
          <button onClick={() => connection()} className="w-fit h-8 rounded-xl text-white bg-blue-700">Connect</button>
          <p className="text-red-400">{errorMessage}</p>
        </div>
      </div>
    </>
  )
}
