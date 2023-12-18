const fs = require('fs');

const handleRoutes = (req, res) => {
    console.log(`Request URL = ${req.url}`);
    const { url } = req;
    const params = url.split('/'); //replaceAll('/', '_');
    const regexName = params[2];
    try {
        const data = fs.readFileSync(`build/${regexName}`, {
            encoding: 'utf8',
            flag: 'r',
        });

        return res.status(200).send({ message: 'chunk is here' });
    } catch {
        res.status(404).send({ message: `file ${regexName} not exist` });
    }
};

export { handleRoutes }; // eslint-disable-line
