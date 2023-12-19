import { setTranslations, setDefaultLanguage, useTranslation, getLanguage, setLanguage } from 'react-multi-lang';
import { mappingObj } from './query';
import { getCookie } from '../hooks/useCookies';

function useSetTranslation() {
  const setInitLang = async () => {
    // Do this two lines only when setting up the application
    // return will be object { en, id, fr }

    const objLang = await mappingObj();

    setTranslations(objLang);
    const lang = getCookie('lang') ?? 'en';
    setDefaultLanguage(lang);
  };
  return { setInitLang, useTranslation, getLanguage, setLanguage };
}

export default useSetTranslation;
