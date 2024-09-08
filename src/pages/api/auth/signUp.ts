import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next";

const prisma: PrismaClient = new PrismaClient();
const bcrypt = require("bcrypt");

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { mailN, passwordN, nameN } = req.body;

        try {
            const accoundAlreadyExist: any = await prisma.user.findFirst({
                where: {
                    mail: mailN
                }
            });

            if (!accoundAlreadyExist) {

                const usersId = await prisma.user.findMany({
                    select: {
                        idUser: true
                    },
                    orderBy: {
                        idUser: "desc"
                    }
                })

                await prisma.user.create({
                    data: {
                        idUser: usersId[0].idUser + 1,
                        mail: mailN,
                        password: await bcrypt.hash(passwordN, 10),
                        name: nameN
                    }
                });

                res.status(202).json({ message: "Account" });
            }
            else {
                res.status(400).json({ message: "You already have an account, connect you !" });
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