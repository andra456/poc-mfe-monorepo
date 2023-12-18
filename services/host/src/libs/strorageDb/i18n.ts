import { setTranslations, setDefaultLanguage, useTranslation, getLanguage, setLanguage } from 'react-multi-lang';
import { mappingObj } from './query';
import { getCookie } from '../hooks/useCookies';
import { useState } from 'react';

function useSetTranslation() {
  const [arrLang, setLang] = useState(null);
  const [defaultLang, setDefaultLang] = useState(getCookie('lang') ?? 'en');
  const setInitLang = async () => {
    // Do this two lines only when setting up the application
    // return will be object { en, id, fr }

    const objLang = await mappingObj();

    setTranslations(objLang);
    setLang(objLang);
    const lang = getCookie('lang') ?? 'en';
    setDefaultLanguage(lang);
  };

  return { setInitLang, arrLang, useTranslation, getLanguage, setLanguage, defaultLang };
}

export default useSetTranslation;
