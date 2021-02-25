import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export function Countdown() {

    const { startNewChallenge } = useContext(ChallengesContext); 

        //25 * 60 pois é 25 min vezes 60 segundos
    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

        //Math.floor arredonda
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    //split divide o caractere mandado
    //ele divide se tiver 2 caracteres

    //padstart verifica se tem 2 caracteres e irá colocar um 0 na esquerda

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);

        setTime(0.1 * 60);
    }

    //ele observa algum efeito nas variaveis passadas, que no caso são
    //isActive e time
    //caso detecte algum efeito, ele realiza determinada ação
    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time -1);
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button 
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}` }
                            onClick={resetCountdown}
                        >
                            Abandonar ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            {/* se isActive existir ele exibe abandonar ciclo, caso contrário iniciar um clico */}
                            {/* isActive ? 'Abandonar ciclo' : 'Iniciar um ciclo'*/}
                            Iniciar um ciclo
                        </button>
                    ) }
                </>
            ) }

        </div>
    );
}