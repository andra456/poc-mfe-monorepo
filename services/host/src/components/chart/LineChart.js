import { Typography } from 'antd';
import { useTranslation } from 'react-multi-lang';
import { useLang } from '../../libs/strorageDb/query';

function LineChart() {
  const { Title, Paragraph } = Typography;
  const { trans } = useLang();

  const t = useTranslation();
  console.log(t);
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Application Remote React.JS</Title>
          <Paragraph className="lastweek">
            running port at <span className="bnb2">8083</span>
            <p>
              sample text translate : {trans('Browse')}, {t('Browse')}
            </p>
          </Paragraph>
        </div>
      </div>
    </>
  );
}

export default LineChart;
