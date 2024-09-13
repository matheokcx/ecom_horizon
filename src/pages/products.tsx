import SideBar from "../components/SideBar"
import Product from "../components/Product"
import { useRouter, NextRouter } from "next/router"
import { useState, useEffect } from "react"


export default function products() {

    const router: NextRouter = useRouter();
    const { userMail }: any = router.query;

    const [products, setProducts] = useState<Array<any>>([]);

    return (
        <>
            <SideBar userMail={userMail} />
            <div className="w-4/5 h-full overflow-y-auto flex flex-col items-center">
                {products.map((e: any, index: any) => <Product key={index} />)}
            </div>
        </>
    )
}