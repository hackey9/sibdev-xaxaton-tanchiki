import { ChangeEventHandler, useState } from 'react';

import Button from '../../components/button/button';
import { ButtonVariants } from '../../components/button/types';
import ReturnButton from '../../components/returnButton/returnButton';

import { COLORS } from './constants';
import styles from './homePage.module.scss';

// TODO: replace with state
const userNumber = 0;

const HomePage = () => {
  const [name, setName] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const hasName = name && name?.length;

  return (
    <main className={styles.home}>
      <div className={styles.homeCard}>
        <div className={styles.homeCardCorner} style={{ backgroundColor: COLORS[userNumber] }} />

        <ReturnButton variant={ButtonVariants.pure} className={styles.homeReturnButton} />

        <img src="https://i.ytimg.com/vi/culwxTEFMYg/maxresdefault.jpg" alt="logo" className={styles.homeLogo} />

        <div className={styles.homeLoginContainer}>
          <div className={styles.homeField}>
            <label>Введите никнейм: </label>
            <input value={name} onChange={handleNameChange} />
          </div>

          <div className={styles.homeButtonsContainer}>
            <Button className={styles.homeButton} disabled={!hasName}>
              Создать игру
            </Button>
            <Button className={styles.homeButton} disabled={!hasName}>
              Подключиться к игре
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
