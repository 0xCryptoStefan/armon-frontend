// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "path";
import { client } from "../../lib/sanityClient";

type ResponseData = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    console.log("Request Body:");
    console.log(req.body);
    console.log("--- END OF REQUEST BODY ---");
    // Client side does JSON.stringify but bodyParser middleware is baked in to Next.js API
    const result = await client.createIfNotExists(req.body);
    if (result) {
      const jsonResult = JSON.stringify(result);
      console.log(`Here is the result: ` + jsonResult);
      res
        .status(200)
        // .json({ message: `${req.body.walletAddress} Added to database` });
        .json({ data: jsonResult });
    }
  }
}
