import HorizontalContainer from "@/components/HorizontalContainer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HorizontalContainer>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </HorizontalContainer>
  );
}
