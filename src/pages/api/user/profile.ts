import { PrismaClient } from "@prisma/client"
import { NextApiRequest, NextApiResponse } from "next"

const prisma: PrismaClient = new PrismaClient();
const bcrypt = require("bcrypt");

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
    else if (req.method === "PUT") {

        const { mailC, mailN, passwordC, passwordN } = req.body;

        try {
            if (mailN === "" && passwordC === "" && passwordN === "") {
                res.status(400).json({ message: "Nothing to update..." });
            }
            else {
                if (mailN !== "") {
                    await prisma.user.update({
                        where: {
                            mail: mailC
                        },
                        data: {
                            mail: mailN
                        }
                    })
                    res.status(200).json({ message: "Mail modified" });
                }

                if (passwordC !== "" && passwordN !== "") {
                    const realPassword: any = await prisma.user.findFirst({
                        where: {
                            mail: mailC,
                        }
                    })

                    const verifyPassword: any = await bcrypt.compare(passwordC, realPassword.password);
                    if (verifyPassword) {
                        await prisma.user.updateMany({
                            where: {
                                mail: mailC
                            },
                            data: {
                                password: await bcrypt.hash(passwordN, 10)
                            }
                        })
                        res.status(200).json({ message: "Password modified" });
                    }
                    else {
                        res.status(400).json({ message: "Password incorrect !" });
                    }
                }
            }
        }
        catch (e: any) {
            const callback: any = e.message;
            res.status(500).json({ message: callback });
        }
    }
    else {
        res.status(405).json({ message: "Method not allowed." });
    }
}