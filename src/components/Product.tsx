import Image from "next/image"

export default function Product({ }) {
    return (
        <>
            <div className="w-1/6 h-1/3 border-2 border-gray-400 bg-white text-black font-sans flex flex-col items-center justify-center transition-transform hover:-translation-2 rounded-xl">
                <Image src="" width="100" height="100" alt="Image of the product" className="rounded-xl" />
            </div>
        </>
    )
}