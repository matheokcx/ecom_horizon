import SideBar from '@/components/SideBar'
import { useState } from 'react'
import { NextRouter, useRouter } from "next/router"

export default function profile() {

    const router: NextRouter = useRouter();

    const { userMail } = router.query;

    const [newMail, setNewMail] = useState<string>("");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const changeInformations = async () => {
        const request = await fetch("/api/user/profile", {
            method: "PUT",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                mailC: userMail,
                mailN: newMail,
                passwordC: currentPassword,
                passwordN: newPassword
            })
        })

        const retour: any = await request.json()
        if (request.ok) {
            alert(retour.message);
            router.push('/');
        }
        else {
            setErrorMessage(retour.message);
        }
    }

    return (
        <>
            <div className="w-screen h-screen bg-white text-black font-sans flex flex-col-reverse lg:flex-row">
                <SideBar userMail={userMail as any} />
                <div className="w-full lg:w-4/5 h-full flex flex-col items-center justify-center gap-14">
                    <h2 className="text-2xl font-bold">Modify your informations</h2>
                    <input type="text" value={newMail} onChange={(e: any) => setNewMail(e.target.value)} placeholder="Your new mail" className="w-2/3 h-8 rounded-lg border-2 border-gray-400 p-1 text-black" />
                    <span className="w-2/3 flex flex-row justify-center items-center gap-4">
                        <input type="password" value={currentPassword} onChange={(e: any) => setCurrentPassword(e.target.value)} placeholder="Your current password" className="w-1/2 h-8 rounded-lg border-2 border-gray-400 p-1 text-black" />
                        <input type="text" value={newPassword} onChange={(e: any) => setNewPassword(e.target.value)} placeholder="Your new password" className="w-1/2 h-8 rounded-lg border-2 border-gray-400 p-1 text-black" />
                    </span>
                    <button onClick={() => changeInformations()} className="w-1/3 h-8 rounded-xl bg-blue-600 text-white transition-transform hover:-translate-y-2">Send</button>
                    <p className="text-red-400 text-lg">{errorMessage}</p>
                </div>
            </div>
        </>
    )
}