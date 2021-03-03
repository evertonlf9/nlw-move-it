
import { useContext } from 'react'
import { ChallengeContext } from '../../contexts/ChallengeContext'
import style from '../../styles/components/Profile.module.scss'

const Profile = () => {

    const { level } = useContext(ChallengeContext);

    return (
        <div className={style.profileContainer}>
            <img src="https://github.com/evertonlf9.png" alt="Everton" />
            <div>
                <strong>Everton</strong>
                <p>
                    <img src="icons/level.svg" alt="level" />
                    Level { level }
                </p>
            </div>
        </div>
    )
}

export default Profile;