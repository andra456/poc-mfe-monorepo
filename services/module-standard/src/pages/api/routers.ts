import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`http://localhost:8084/${req.body.path}`);
  if (req.method?.toString() !== 'POST') {
    return res.status(404).json({ data: null });
  }
  return res.status(200).json({ available: response.status !== 404 });
}
