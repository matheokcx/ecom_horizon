import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma: PrismaClient = new PrismaClient();
const { getJson } = require("serpapi");

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        try {
            const request = await fetch("https://serpapi.com/search.json?engine=google_trends&q=coffee,milk,bread,pasta,steak&data_type=TIMESERIES");
            const { search } = req.query;

            getJson({
                engine: "google_trends",
                q: search,
                data_type: "TIMESERIES",
                api_key: "ef61b8d9cc1672dc3ce73972cde50f2b5ddb77bdb04545c5690c7627e4c0c5a7"
            }, (data: any) => {
                res.status(200).json({ data });
            });

        }
        catch (e: any) {
            const callback: string = e.message
            res.status(500).json({ message: callback });
        }
    }
    else {
        res.status(405).json({ message: "Wrong HTTP request method ..." });
    }
}