import { useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

export default function Home() {

  const router: NextRouter = useRouter();
  const [mailValue, setMailValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [errorMessage, SetErrorMessage] = useState<string>("");

  const [newMailValue, setNewMailValue] = useState<string>("");
  const [newPasswordValue, setNewPasswordValue] = useState<string>("");
  const [newNameValue, setNewNameValue] = useState<string>("");
  const [newErrorMessage, setNewErrorMessage] = useState<string>("");

  const connection = async () => {
    const requete = await fetch("/api/auth/login", {
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
      const theToken = await requete.json().then((data: any) => data.token)
      router.push(`/dashboard?userMail=${mailValue}&token=${theToken}`);
    }
    else {
      const callBack: any = await requete.json();
      SetErrorMessage(callBack.message);
    }
  }

  const signup = async () => {
    const requete = await fetch("/api/auth/signUp", {
      method: "POST",
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify({
        mailN: newMailValue,
        passwordN: newPasswordValue,
        nameN: newNameValue
      })
    });

    if (requete.ok) {
      alert("Account created ! Go to connection -> ");
      router.reload();
    }
    else {
      const retour: any = await requete.json();
      setNewErrorMessage(retour.message);
    }
  }

  return (
    <>
      <div className="w-screen h-screen flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-blue-800 to-black bg-fixed font-sans text-black">
        <div className="w-full lg:w-3/5 h-1/2 lg:h-full flex flex-col items-center justify-center">
          <div className="w-2/3 h-2/3 bg-white bg-opacity-60 rounded-xl flex flex-col items-center justify-center gap-12">
            <h2 className="font-bold text-2xl pb-12 text-white lg:text-blacklg:pb-0">LogIn</h2>
            <input type="mail" value={mailValue} onChange={(e: any) => setMailValue(e.target.value)} placeholder="Your mail" className="w-5/6 h-8 rounded-lg p-1 border-1 border-gray-400 bg-white text-black" />
            <input type="password" value={passwordValue} onChange={(e: any) => setPasswordValue(e.target.value)} placeholder="Your password" className="w-5/6 h-8 rounded-lg p-1 border-1 border-gray-400 bg-white text-black" />
            <button onClick={() => connection()} className="w-1/3 h-12 rounded-xl text-white bg-blue-700 transition-transform hover:-translate-y-2">Connect</button>
            <p className="text-red-400">{errorMessage}</p>
          </div>
        </div>
        <div className="w-full lg:w-2/5 h-1/2 lg:h-full overflow-y-auto flex flex-col items-center pt-24 gap-16 bg-white text-black rounded-xl">
          <h2 className="font-bold text-2xl">Sign Up</h2>
          <input type="newMail" value={newMailValue} onChange={(e: any) => setNewMailValue(e.target.value)} placeholder="Your mail" className="w-4/6 h-8 rounded-lg p-1 border-2 border-gray-400 bg-white text-black" />
          <input type="password" value={newPasswordValue} onChange={(e: any) => setNewPasswordValue(e.target.value)} placeholder="Your password" className="w-4/6 h-8 rounded-lg p-1 border-2 border-gray-400 bg-white text-black" />
          <input type="text" value={newNameValue} onChange={(e: any) => setNewNameValue(e.target.value)} placeholder="Your name" className="w-4/6 h-8 rounded-lg p-1 border-2 border-gray-400 bg-white text-black" />
          <button onClick={() => signup()} className="w-1/3 h-12 rounded-xl text-white bg-blue-700 transition-transform hover:-translate-y-2">Create</button>
          <p className="text-red-400">{newErrorMessage}</p>
        </div>
      </div >
    </>
  )
}
