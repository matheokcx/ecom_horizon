import { NextRouter, useRouter } from "next/router";
import SideBar from "../components/SideBar"
import { useState, useEffect } from "react"

export default function dashboard() {

    const router: NextRouter = useRouter();
    const { mail, token }: any = router.query;
    const [informations, setInformations] = useState<any>({});

    const getInformations = async () => {
        const request = await fetch("/api/user/profile", {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                userMail: mail
            })
        });

        const retour: any = await request.json();
        if (request.ok) {
            setInformations(retour);
        }
        else {
            alert(retour.message);
        }
    }

    useEffect(() => {
        if (mail) {
            getInformations();
        }
    }, [mail]);

    return (
        <>
            <div className="w-screen h-screen flex flex-row bg-white">
                <SideBar />
                <div className="w-4/5 h-full flex flex-col items-center justify-center">
                    <p className="text-2xl text-black">Welcome <strong>{informations.name}</strong> !</p>
                </div>
            </div>
        </>
    )
}