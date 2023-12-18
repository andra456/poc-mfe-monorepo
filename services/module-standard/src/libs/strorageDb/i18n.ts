/*
import { setTranslations, setDefaultLanguage, useTranslation, getLanguage, setLanguage } from 'react-multi-lang';
import axios from 'axios';
const getCurrentHost = 'http://localhost:4200';

function useSetTranslation() {
  const setInitLang = async ({ module }: { module: string }) => {
    const lang = localStorage.getItem('LANG');
    const objLang = await axios({
      method: 'get',
      url: `${getCurrentHost}/translate/${lang}/${module}`,
    }).then((res: any) => {
      return res.data;
    });
    // Do this two lines only when setting up the application
    // return will be object { en, id, fr }
    setTranslations(objLang);
    setDefaultLanguage('en');
  };
  return { setInitLang, useTranslation, getLanguage, setLanguage };
}

export default useSetTranslation;
*/
