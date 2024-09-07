import Link from "next/link"

export default function SideBar() {
    return (
        <>
            <div className="w-1/5 h-full bg-gray-800 rounded-lg flex flex-col pl-8 gap-10 pt-10 text-white font-bold">
                <Link href="/products">Products</Link>
                <Link href="/">Suppliers</Link>
                <Link href="/">Favorites</Link>
                <Link href="/">Profile</Link>
            </div>
        </>
    )
}