import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Run the middleware
  await runMiddleware(req, res, cors);
  const { params=[] } = req.query;

  // Rest of the API logic
  const link = process.env.BASE_URL +`/source/${params[0]}/pages/${params[1]}`;
  console.log(params, link);
  try {
    const isAny = await fetch(link);
    console.log(isAny);
    if (isAny.status === 200) {
      res.status(200).json({ code: 200, message: "page is provided" });
    }
    res.status(404).json({ code: 404, message: `page not found` });
  } catch {
    res.status(404).json({ code: 404, message: `page not found` });
  }
  // res.json({ message: "Hello Everyone!" });
}
