import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import QRCode from 'react-qr-code';

import Button from '../../components/button/button';
import { ButtonVariants } from '../../components/button/types';
import ReturnButton from '../../components/returnButton/returnButton';

import styles from './serverConnectionPage.module.scss';

type ServerConnectionPageProps = {
  qrValue?: string;
  users: any[]; // TODO
  handleScan: VoidFunction;
  handleStartGame: VoidFunction;
};

const ServerConnectionPage: FC<ServerConnectionPageProps> = observer(
  ({ qrValue, users, handleStartGame, handleScan }) => {
    // TODO: draw users

    return (
      <main className={styles.page}>
        <div className={styles.pageCard}>
          <ReturnButton variant={ButtonVariants.pure} className={styles.pageReturnButton} />

          <h1>Подключение к игре</h1>

          <Button onClick={handleStartGame}>Начать игру</Button>

          <p>QR-код должен отсканировать один из участников, чтобы присоединиться к игре.</p>
          <p>Начните игру, когда присоединяться все участники.</p>

          <div className={styles.pageQRWrapper}>{qrValue && <QRCode value={qrValue} />}</div>
          <button onClick={handleScan}>Сканировать QR-код игрока</button>
        </div>
      </main>
    );
  }
);

export default ServerConnectionPage;
