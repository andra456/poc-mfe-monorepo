/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import express from 'express';
import path from 'path';

import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import responseTime from 'response-time';
import cors from 'cors';
import bodyParser from 'body-parser';
import handlebars from 'express-handlebars';
import { handleRoutes } from './handleRoutes';
import { handleCSR } from './handleCSR';

const app = express();
const router = express.Router();

// view engine setup

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(helmet());
router.use(responseTime());
router.use(cors(corsOptions));
router.use(cookieParser());

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(
  bodyParser.json({
    limit: '5mb',
  }),
);

app.engine(
  'html',
  handlebars({
    helpers: {
      toJson: (object: unknown) => JSON.stringify(object),
    },
  }),
);
app.set('view engine', 'html');
app.get('/p/*', cors(corsOptions), handleRoutes);

router.use(
  '/custom-react',
  express.static(path.join(__dirname, '../', 'customize-react'), {
    redirect: false,
  }),
);
router.use(
  '/remote-react',
  express.static(path.join(__dirname, '../', 'remote-react'), {
    redirect: false,
  }),
);
router.use(
  '/ass',
  express.static(path.join(__dirname, '../', 'container-host'), {
    redirect: false,
  }),
);

router.use(
  express.static(path.join(__dirname, '../', 'container-host'), {
    redirect: false,
  }),
);

app.get('/app/*', cors(corsOptions), handleCSR);

app.use(router);

export default app;
