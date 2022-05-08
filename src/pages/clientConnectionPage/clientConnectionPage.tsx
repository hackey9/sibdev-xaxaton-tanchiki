import QrScanner from 'qr-scanner';
import { FC, useEffect, useRef } from 'react';

import ReturnButton from '../../components/returnButton/returnButton';
import useForceUpdate from '../../hooks/useForceUpdate';

import styles from './clientConnectionPage.module.scss';

type ClientConnectionPageProps = {
  handleQRResult: (qrResult: string) => void;
  handleReturn: VoidFunction;
};

const ClientConnectionPage: FC<ClientConnectionPageProps> = ({ handleQRResult, handleReturn }) => {
  // TODO: remove any
  const qrVideoRef = useRef<any>();

  const qrScanner = qrVideoRef.current
    ? // @ts-ignore
      new QrScanner(qrVideoRef.current, ({ data }) => handleQRResult(data), { highlightScanRegion: true })
    : null;

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, []);

  useEffect(() => {
    if (qrVideoRef.current && qrScanner) {
      qrScanner?.start();
    }

    return () => qrScanner?.stop();
  }, [qrScanner]);

  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        <ReturnButton className={styles.pageReturnButton} onClick={handleReturn} />

        <h2>Подключение к игре</h2>
        <p>Отсканируйте QR-код создателя игры, чтобы присоединиться к игре.</p>

        <div className={styles.pageQRReader}>
          <video ref={qrVideoRef} className={styles.pageQRReaderVideo} />
        </div>
      </div>
    </main>
  );
};

export default ClientConnectionPage;
