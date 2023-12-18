
import { AppProvider } from "@/libs/context/appContext";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  console.log(pageProps)
  return  <Component {...pageProps} />
    
  
}

export default MyApp;
