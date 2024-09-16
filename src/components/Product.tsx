import Image from "next/image"

interface props {
    name: string;
    minPrice: Float32Array;
    maxPrice: Float32Array;
}

export default function Product({ name, minPrice, maxPrice }: props) {
    return (
        <>
            <div className="w-1/6 h-1/3 border-2 border-gray-400 bg-white text-black font-sans flex flex-col items-center justify-center transition-transform hover:-translation-2 rounded-xl">
                <Image src="" width="100" height="100" alt="Image of the product" className="rounded-xl" />
                <h2 className="tedt-xl font-bold">{name}</h2>
                <p>{minPrice}€ - {maxPrice}€</p>
            </div>
        </>
    )
}