import { NextRouter, useRouter } from "next/router";
import SideBar from "../components/SideBar"

export default function dashboard() {

    const router: NextRouter = useRouter();
    const { mail } = router.query;

    return (
        <>
            <div className="w-screen h-screen flex flex-row bg-white">
                <SideBar />
                <div className="w-4/5 h-full flex flex-col items-center justify-center">
                    <p className="text-2xl text-black">Welcome <strong>{mail}</strong> !</p>
                </div>
            </div>

        </>
    )
}