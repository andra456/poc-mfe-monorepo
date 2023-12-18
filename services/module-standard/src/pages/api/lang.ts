import { NextApiRequest, NextApiResponse } from 'next';
import ID from '@/source/lang/in.json';
import EN from '@/source/lang/en.json';
import FR from '@/source/lang/fr.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query;
  const arr = [
    { key: 'id', data: ID },
    { key: 'en', data: EN },
    { key: 'fr', data: FR },
  ];
  if (req.method?.toString() !== 'GET' || !lang) {
    return res.status(500).json({ message: 'wrong request' });
  }
  const isAny = arr.findIndex((e: any) => e.key === lang);
  if (isAny === -1) {
    return res.status(501).json({ message: 'languege not available' });
  }
  return res.status(200).json({ result: arr[isAny] });
}
