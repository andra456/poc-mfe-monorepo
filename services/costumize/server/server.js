import path from 'path';
import express from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { handleRoutes } from './handleRoutes.js';
import { handleSSR } from './handleSSR.js';

require('./setup.js').setup();
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();
const router = express.Router();

router.use(helmet());
router.use(responseTime());
router.use(cors(corsOptions));
router.use(cookieParser());

app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(
    bodyParser.json({
        limit: '5mb',
    })
);

app.engine(
    'html',
    handlebars({
        helpers: {
            toJson: (object) => JSON.stringify(object),
        },
    })
);
app.set('view engine', 'html');
require('./routes/index.js')(router);

router.use(
    express.static(path.join(__dirname, '../', 'build'), {
        redirect: false,
    })
);
router.use(
    express.static(path.join(__dirname, '../', 'assets'), {
        redirect: false,
    })
);

app.get('/p/*', cors(corsOptions), handleRoutes);
// app.get('/ssr/*', cors(corsOptions), handleSSR);

app.use(router);

app.shutdown = () => {
    require('./setup.js').teardown(); // eslint-disable-line global-require
};

module.exports = {
    app,
};
