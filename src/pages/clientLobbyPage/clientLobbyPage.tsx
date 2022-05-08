import { FC } from 'react';

import preloader from '../../assets/gif/load.gif';
import UsersList from '../../components/usersList/usersList';

import styles from './clientLobbyPage.module.scss';

type ClientLobbyPageProps = {
  users?: { name: string; color: string }[];
};

const ClientLobbyPage: FC<ClientLobbyPageProps> = ({ users }) => {
  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        <div>
          <p>Вы подключились к игре!</p>
          <p>Подождите, пока создатель игры начнет ее.</p>
        </div>

        {users && Boolean(users?.length) && <UsersList users={users} />}

        <div>
          <img src={preloader} alt="loading..." />
        </div>
      </div>
    </main>
  );
};

export default ClientLobbyPage;
