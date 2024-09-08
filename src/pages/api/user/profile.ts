import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma: PrismaClient = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { userMail } = req.body;

        try {
            const informations: any = await prisma.user.findFirst({
                where: {
                    mail: userMail
                }
            });

            if (informations) {
                res.status(200).json(informations);
            }
            else {
                res.status(404).json({ message: "Datas not found ..." });
            }
        }
        catch (e: any) {
            const callback: string = e.message;
            res.status(500).json({ message: callback });
        }
    }
    else {
        res.status(405).json({ message: "Method not allowed." });
    }
}