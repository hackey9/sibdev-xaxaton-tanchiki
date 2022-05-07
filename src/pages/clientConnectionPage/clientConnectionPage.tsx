import { FC, useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

import { CheckIcon } from '../../assets/icons';
import Button from '../../components/button/button';
import ReturnButton from '../../components/returnButton/returnButton';

import styles from './clientConnectionPage.module.scss';

type ClientConnectionPageProps = {
  handleQRResult?: (qrResult: string) => void;
  handleConnect?: VoidFunction;
};

const ClientConnectionPage: FC<ClientConnectionPageProps> = ({ handleQRResult, handleConnect }) => {
  const [qrText, setQrText] = useState<string>();

  const hasQRText = qrText && qrText?.length;

  const handleQRReaderResult: OnResultFunction = (result, error) => {
    if (result) {
      setQrText(result?.getText());
      handleQRResult?.(result?.getText());
    }

    if (error) {
      // TODO: return
      // alert(error.toString());
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.pageCard}>
        <ReturnButton className={styles.pageReturnButton} />

        <h1>Подключение к игре</h1>

        {!hasQRText && (
          <>
            <p>Отсканируйте QR-код, игрока-сервера, чтобы присоединиться к игре.</p>

            <QrReader
              className={styles.pageQRReader}
              constraints={{ aspectRatio: 1 }}
              onResult={handleQRReaderResult}
            />
          </>
        )}

        {hasQRText && (
          <>
            <div className={styles.pageSuccessWrapper}>
              <CheckIcon className={styles.pageSuccessIcon} />
            </div>

            <Button className={styles.pageConnectButton} onClick={handleConnect}>
              Присоединиться
            </Button>
          </>
        )}
      </div>
    </main>
  );
};

export default ClientConnectionPage;
