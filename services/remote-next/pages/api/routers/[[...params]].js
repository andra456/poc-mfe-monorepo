import NextCors from 'nextjs-cors';

export default async function handler(req, res) {
  const { params } = req.query;
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    const isAny = await fetch(`http://localhost:8081/source/${params[0]}/pages/${params[1]}`);
    if (isAny.status === 200) {
      res.status(200).json({ code: 200, message: 'page is provided' });
    }
    res.status(404).json({ code: 404, message: `page not found` });
  } catch {
    res.status(404).json({ code: 404, message: `page not found` });
  }
}
