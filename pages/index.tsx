import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Featured from '../components/home/Featured';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Limate</title>
        <meta
          name="Limate"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Featured />
    </div>
  );
};

export default Home;
