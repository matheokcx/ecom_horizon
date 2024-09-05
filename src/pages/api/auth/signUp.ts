import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";

const prisma: PrismaClient = new PrismaClient();
const bcrypt = require("bcrypt");

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { mailN, passwordN } = req.body;

        try {
            const accoundAlreadyExist: any = await prisma.user.findFirst({
                where: {
                    mail: mailN
                }
            });

            if (!accoundAlreadyExist) {
                await prisma.user.create({
                    data: {
                        idUser: 2,
                        mail: mailN,
                        password: bcrypt.hash(passwordN, 10)
                    }
                });

                res.status(202).json({ message: "Account" })
            }
        }
        catch (e: any) {
            const callback: string = e.message;
            res.status(500).json({ message: callback });
        }
    }
    else {
        res.status(405).json({ message: "The method of the request is not good." });
    }
}