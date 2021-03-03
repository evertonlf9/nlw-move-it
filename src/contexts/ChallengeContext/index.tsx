import { Children, createContext, useState, ReactNode, useEffect } from 'react';
import Cookie from 'js-cookie';
import challenges from '../../../challenges.json';

import { LevelUpModal } from '../../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContexData {
    level: number; 
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    aciveChallenges: Challenge;
    levelUp(): void; 
    startNewChallenge(): void;
    resetChallenge(): void;
    completeChallenge(): void;
    closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
  children: ReactNode;
  level: number,
	currentExperience: number,
	challengesCompleted: number
}

export const ChallengeContext = createContext({} as ChallengesContexData);

export const ChallengesProvider = ({ children, ...rest  }: ChallengesProviderProps) => {
  const [level ,setlevel] = useState(1);
  const [currentExperience ,setCurrentExpirience] = useState(0);
  const [challengesCompleted ,setChallengesComplete] = useState(0);
  const [aciveChallenges ,setAciveChallenges] = useState(null);
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);
  const[isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
		Cookie.set('level', String(level));
		Cookie.set('currentExperience', String(currentExperience));
		Cookie.set('challengesCompleted', String(challengesCompleted));

	}, [level, currentExperience, challengesCompleted])

  const levelUp = () => {
    setlevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setAciveChallenges(challenge);

    new Audio('/notiication.mp3').play();

    if(Notification.permission === 'granted') {
      new Notification('Novo desafio ', {
        body: `Valendo ${challenge.amount}xp`
      })
    }
  }

  const resetChallenge = () => {
    setAciveChallenges(null);
  }

  const completeChallenge = () => {
    if(!aciveChallenges) return;

    const { amount } = aciveChallenges;
    let finalExperience = currentExperience + amount;

    if(finalExperience  >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExpirience(finalExperience);
    setAciveChallenges(null);
    setChallengesComplete(challengesCompleted + 1);
  }

  const closeLevelUpModal = () => {
		setIsLevelUpModalOpen(false);
	}

  return (
    <ChallengeContext.Provider value={{
        level, 
        currentExperience, 
        challengesCompleted, 
        aciveChallenges,
        experienceToNextLevel,
        levelUp, 
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
    }}>
        {children}
        {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengeContext.Provider>
  )
}
