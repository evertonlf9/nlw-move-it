import ExperienceBar  from '../components/ExperienceBar';
import Profile  from '../components/Profile';
import CompleteChallenge  from '../components/CompleteChallenge';
import CountDown  from '../components/CountDown';
import ChallengeBox  from '../components/ChallengeBox';

import Head from 'next/head';

import style from '../styles/pages/Home.module.scss'
import { CountDownProvider } from '../contexts/CountDownContext';

export default function Home() {
  return (
    <div className={style.container}>
      <Head>
        <title>Move - it</title>
      </Head>
      <ExperienceBar />
      <CountDownProvider>
        <section>
          <div>
            <Profile />
            <CompleteChallenge />
            <CountDown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountDownProvider>
    </div>
  )
}
