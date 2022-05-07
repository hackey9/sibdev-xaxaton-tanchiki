import QRCode from 'react-qr-code';

import Button from '../../components/button/button';
import { ButtonVariants } from '../../components/button/types';
import ReturnButton from '../../components/returnButton/returnButton';

import styles from './serverConnectionPage.module.scss';

const ServerConnectionPage = () => {
  const qrValue = 'wefwefwef';

  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        <ReturnButton variant={ButtonVariants.pure} className={styles.pageReturnButton} />

        <h1>Подключение к игре</h1>

        <Button>Начать игру</Button>

        <p>QR-код должен отсканировать один из участников, чтобы присоединиться к игре.</p>
        <p>Начните игру, когда присоединяться все участники.</p>

        <div className={styles.pageQRWrapper}>
          <QRCode value={qrValue} />
        </div>

        <Button className={styles.pageGenerateButton}>Сгенерировать еще</Button>
      </div>
    </main>
  );
};

export default ServerConnectionPage;
