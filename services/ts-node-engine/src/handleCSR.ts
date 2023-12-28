/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable comma-dangle */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */

const path = require('path');
const handleCSR = (req: any, res: any) => {
  try {
    res.sendFile(path.join(__dirname, '../', 'container-host/index.html'), function(err: any) {
      if (err) {
        res.status(500).send(err);
      }
    });
  } catch {
    res.status(404).send({ message: 'page kosong' });
  }
};

export { handleCSR }; // eslint-disable-line
