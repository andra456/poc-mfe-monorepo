import type { NextPage } from "next";
import { AppProvider, useAppContext } from '@/libs/context/appContext';
import useSocket from "@/libs/hooks/useSocket";
import React, { useState, useEffect} from "react";
import dynamic from "next/dynamic";

import { addBulkDataToIndexedDB, addFieldToIndexedDB, fetchAPI } from "@/libs/strorageDb/query";
import _ from "lodash"
import axios from "axios";
import { useCookies } from "@/libs/hooks/useCookies";


const ModuleHome  = dynamic(()=> import('@/components/pages/home'), { ssr : false})
const Home: NextPage = () => {
  // const roomId = "666";
  // const { messages, sendMessage, setConnect, socket } = useSocket(roomId);
  const { getCookie} = useCookies()
  console.log('home');
  

  const fetchAPI = async () => {
    const startTime = performance.now()
    try {
      
      const res = await axios({
        method: 'GET',
        url: 'https://sf7dev-pro.dataon.com/sfpro/?ofid=SFTranslation.GetLangUI',
        params: {
          thelang: getCookie('lang')
        },
        headers: {
          "Authorization" : `Bearer ${getCookie('token')}`
        }
      });

      if (res) {
        console.log(res)
        //const lang = res.data.result.data;
        const mlang = res.data.DATA.RESULT
        // const mapLang = _.values(lang).map((e:any)=> { return { textId : e, text : e }});
        console.log(mlang);
        addFieldToIndexedDB('lang', { key: 'id', last_update : new Date(), values : mlang })
        //
        //addBulkDataToIndexedDB('id', mapLang)
      }
    } catch {
      console.log('error')
    } finally {
      const endTime = performance.now()
      console.log(`Call to fetch-lang took ${endTime - startTime} milliseconds`)
    }
    
  }
  useEffect(() => {
    fetchAPI();
  }, [])
  

  

  return (<div className="p-8 w-full">
    <AppProvider>
      
        <ModuleHome />
     
    </AppProvider>
  </div>);
};

export default Home;
