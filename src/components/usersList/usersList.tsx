import { FC } from 'react';

import styles from './usersList.module.scss';

const UsersList: FC<{ users: { name: string; color: string }[] }> = ({ users }) => {
  return (
    <div className={styles.usersList}>
      <h3>Список участников</h3>

      {users.map(({ name, color }) => (
        <div className={styles.usersContainer}>
          <span className={styles.usersContainerCorner} style={{ backgroundColor: color }} />
          <p>{name}</p>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
