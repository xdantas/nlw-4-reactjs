import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/experienceBar.module.css';

export function ExperienceBar() {
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percentToNextLevel = Math.round(currentExperience * 100) / experienceToNextLevel;

    return (
        // Utlização de uma classe de um módulo css
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{width: `${percentToNextLevel}`}}/>
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}` }}> { currentExperience } xp </span>
            </div>
            <span> { experienceToNextLevel } xp</span>
        </header>
    );
}