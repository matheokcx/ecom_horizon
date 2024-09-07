import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma: PrismaClient = new PrismaClient();
const bcrypt = require("bcrypt");

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { mailV, passwordV } = req.body;

        try {
            const existedAccount = await prisma.user.findFirst({
                where: {
                    mail: mailV,
                }
            });

            if (existedAccount) {

                const passwordVerify = await bcrypt.compare(passwordV, existedAccount.password);

                if (passwordVerify) {
                    res.status(201).json({ message: "Connection succes !" });
                }
                else {
                    res.status(401).json({ message: "Password incorrect." });
                }
            }
            else {
                res.status(404).json({ message: "You don't have an account, create one !" });
            }
        }
        catch (e: any) {
            const callBack: string = e.message;
            res.status(500).json({ message: callBack });
        }
    }
    else {
        res.status(405).json({ message: "The method of the request is not good." });
    }
}