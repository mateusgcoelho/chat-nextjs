import { randomUUID } from "crypto";
import { NextApiRequest, NextApiResponse } from "next";

let messages: Array<{
    id: string;
    message: string;
}> = [];
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const data = req.body;

        messages.push({
            id: randomUUID(),
            message: data.message,
        });

        return res.status(201).json(messages);
    }
    else if (req.method == "GET") {
        res.status(200).json(messages);
    }
}