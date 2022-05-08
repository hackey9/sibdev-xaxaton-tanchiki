import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import QRCode from 'react-qr-code';

import styles from './clientQRPage.module.scss';

type ClientQRPageProps = {
  qrValue?: string;
};

const ClientQRPage: FC<ClientQRPageProps> = observer(({ qrValue }) => {
  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        <h1>Подключение к игре</h1>

        {qrValue && (
          <>
            <p>QR-код должен отсканировать создатель игры, чтобы вы могли присоединиться к игре.</p>

            <div className={styles.pageQRWrapper}>
              <QRCode value={qrValue} />
            </div>
          </>
        )}
      </div>
    </main>
  );
});

export default ClientQRPage;
