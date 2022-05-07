import { FC } from 'react';

import preloader from '../../assets/gif/load.gif';
import ReturnButton from '../../components/returnButton/returnButton';

import styles from './clientLobbyPage.module.scss';

type ClientLobbyPageProps = {
  users?: { name: string; color: string }[];
};

const ClientLobbyPage: FC<ClientLobbyPageProps> = ({ users }) => {
  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        <ReturnButton className={styles.pageReturnButton} />

        <div>
          <p>Вы подключились к игре!</p>
          <p>Подождите, пока создатель игры начнет ее.</p>
        </div>

        {users?.length && (
          <div className={styles.pageUsersList}>
            <h3>Список участников</h3>

            {users.map(({ name, color }) => (
              <div className={styles.pageUserContainer}>
                <span className={styles.pageUserContainerCorner} style={{ backgroundColor: color }} />
                <p>{name}</p>
              </div>
            ))}
          </div>
        )}

        <div>
          <img src={preloader} alt="loading..." />
        </div>
      </div>
    </main>
  );
};

export default ClientLobbyPage;
