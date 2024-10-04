import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"
import { getJson } from "serpapi"

const prisma: PrismaClient = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {

        try {
            const { search } = req.query;

            getJson({
                engine: "google_trends",
                q: search,
                data_type: "TIMESERIES",
                api_key: "ef61b8d9cc1672dc3ce73972cde50f2b5ddb77bdb04545c5690c7627e4c0c5a7"
            }, (data: any) => {
                const dates_informations: Array<any> = data.interest_over_time.timeline_data;
                let values: Array<number> = [];
                let dates: Array<string> = [];
                for (let i = 0; i < dates_informations.length; i++) {
                    dates[i] = dates_informations[i].date.substring(4, 11);
                    values[i] = dates_informations[i].values[0].extracted_value;
                }
                for (let i = 0; i < values.length; i++) {
                    dates[i] = i.toString()
                }

                res.status(200).json({
                    labels: dates,
                    datasets: [
                        {
                            label: 'Sales',
                            data: values,
                            borderColor: 'rgb(205, 90, 255)',
                            tension: 0.4,
                        },
                    ],
                });
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