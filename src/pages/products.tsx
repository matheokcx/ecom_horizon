import SideBar from "../components/SideBar"
import { useRouter, NextRouter } from "next/router"
import { useState } from "react"
import LineChart from "@/components/LineChart";


export default function products() {

    const router: NextRouter = useRouter();
    const { userMail }: any = router.query;

    const [search, setSearch] = useState<string>("");
    const [result, setResult] = useState<any | null>(null);

    const makeSearch = async () => {
        const request = await fetch(`api/product/infos?search=${search}`);

        if (request.ok) {
            const retour = await request.json().then((data: any) => setResult(data));
        }
        else {
            const retour = await request.json();
            alert(retour.message);
        }
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col-reverse lg:flex-row text-black font-sans bg-white">
                <SideBar userMail={userMail} />
                <div className="w-4/5 h-full overflow-y-auto flex flex-col items-center">
                    <span className="w-full flex flex-row items-baseline justify-center gap-8 p-4">
                        <input type="text" value={search} onChange={(e: any) => setSearch(e.target.value)} placeholder="Search a trending product" className="w-5/6 h-8 border-2 border-gray-400 p-1 text-black rounded-xl mt-4" />
                        <button className="w-1/6 h-8 rounded-xl bg-white border-2 border-gray-400 transition-all hover:bg-gray-700 hover:text-white hover:border-0 hover:-translate-y-2" onClick={() => makeSearch()}>o-</button>
                    </span>
                    {result == null ? null : <LineChart donnees={result} />}
                </div>
            </div>
        </>
    )
}