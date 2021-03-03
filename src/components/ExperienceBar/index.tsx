
import { useContext } from 'react';
import { ChallengeContext } from '../../contexts/ChallengeContext';
import styles from '../../styles/components/ExperienceBar.module.scss';

const ExperienceBar = () => {
    const { currentExpirience, experienceToNextLevel } = useContext(ChallengeContext);
    const porcentToNextLevel = Math.round((currentExpirience * 100) / experienceToNextLevel)

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${porcentToNextLevel}%`}}></div>
                <span className={styles.currentExperience} style={{left: `${porcentToNextLevel}%`}}>
                    { currentExpirience } xp
                </span>
            </div>
            <span>{ experienceToNextLevel } xp</span>
        </header>
    )
}

export default ExperienceBar;