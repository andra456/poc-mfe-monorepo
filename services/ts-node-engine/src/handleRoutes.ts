/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = require('fs');

const handleRoutes = (req: any, res: any) => {
  console.log(`Request URL = ${req.url}`);
  const { url } = req;
  const params = url.split('/');
  const regexName = params[2];
  try {
    const data = fs.readFileSync(`customize-react/${regexName}`, {
      encoding: 'utf8',
      flag: 'r',
    });
    return data && res.status(200).send({ message: 'chunk is here' });
  } catch {
    res.status(404).send({ message: `file ${regexName} not exist` });
  }
};

export { handleRoutes }; // eslint-disable-line
