import Link from "next/link"
import { NextRouter, useRouter } from "next/router"

interface props {
    userMail: string
}

export default function SideBar({ userMail }: props) {

    const router: NextRouter = useRouter();

    return (
        <>
            <div className="w-full lg:w-1/5 h-1/4 lg:h-full overflow-x-auto bg-gray-800 rounded-lg flex flex-row items-center lg:items-normal lg:flex-col pl-8 gap-10 pt-10 text-white font-bold">
                <button onClick={() => router.push(`/products?userMail=${userMail}`)}>Products</button>
                <button onClick={() => router.push(`/`)}>Suppliers</button>
                <button onClick={() => router.push(`/`)}>Analytics</button>
                <button onClick={() => router.push(`/profile?userMail=${userMail}`)}>Profile</button>
                <button className="w-1/3 h-9 bg-red-400 rounded-lg transition-transform hover:-translate-y-2"><Link href="/">Logout</Link></button>
            </div>
        </>
    )
}