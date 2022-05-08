import { ChangeEventHandler, FC, useState } from 'react';

import Button from '../../components/button/button';

import styles from './homePage.module.scss';

type HomePageProps = {
  handleCreateGame: (name: string) => void;
  handleConnect: (name: string) => void;
};

const HomePage: FC<HomePageProps> = ({ handleCreateGame, handleConnect }) => {
  const [name, setName] = useState('');

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const hasName = name && name?.length;

  return (
    <main className={styles.home}>
      <div className={styles.homeCard}>
        <img src="https://i.ytimg.com/vi/culwxTEFMYg/maxresdefault.jpg" alt="logo" className={styles.homeLogo} />

        <form className={styles.homeLoginContainer}>
          <div className={styles.homeField}>
            <label>Введите никнейм: </label>
            <input value={name} onChange={handleNameChange} />
          </div>

          <div className={styles.homeButtonsContainer}>
            <Button
              className={styles.homeButton}
              disabled={!hasName}
              type="submit"
              onClick={() => handleCreateGame(name)}
            >
              Создать игру
            </Button>
            <Button className={styles.homeButton} disabled={!hasName} onClick={() => handleConnect(name)}>
              Подключиться к игре
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default HomePage;
