import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

import ReturnButton from '../../components/returnButton/returnButton';

import styles from './clientConnectionPage.module.scss';

type ClientConnectionPageProps = {
  handleQRResult: (qrResult: string) => void;
  handleReturn: VoidFunction;
};

const ClientConnectionPage: FC<ClientConnectionPageProps> = observer(({ handleQRResult, handleReturn }) => {
  const handleQRReaderResult: OnResultFunction = (result, error) => {
    if (result) {
      alert(result.getText());
      handleQRResult(result.getText());
    }

    if (error) {
      // alert(error.toString());
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        {/* TODO: add onClick */}
        <ReturnButton className={styles.pageReturnButton} />

        <h1>Подключение к игре</h1>

        <p>Отсканируйте QR-код создателя игры, чтобы присоединиться к игре.</p>

        <QrReader
          className={styles.pageQRReader}
          constraints={{ aspectRatio: 1, facingMode: 'environment' }}
          onResult={handleQRReaderResult}
        />
      </div>
    </main>
  );
});

export default ClientConnectionPage;
