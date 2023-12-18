import React, { useEffect } from 'react';

import { fetchAPI, isAnyField } from '../libs/strorageDb/query';
import { setCookie, useCookies } from '../libs/hooks/useCookies';
import useSetTranslation from '../libs/strorageDb/i18n';

const ProviderLang = () => {
  const { getCookie } = useCookies();
  const { setInitLang } = useSetTranslation();

  const rightComplex = async () => {
    if (getCookie('lang') === '') {
      setCookie('lang', 'EN', 12);
    }
    const lang = getCookie('lang') ?? 'EN';
    const anx = await isAnyField(lang);

    setInitLang();
    if (!anx) {
      fetchAPI();
    }
  };
  useEffect(() => {
    rightComplex();
  }, []);

  return <div className="p-8 w-full"></div>;
};

export default ProviderLang;
