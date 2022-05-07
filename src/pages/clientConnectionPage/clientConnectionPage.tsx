import { useState } from 'react';
import { OnResultFunction, QrReader } from 'react-qr-reader';

import Button from '../../components/button/button';

const ClientConnectionPage = () => {
  const [qrText, setQrText] = useState<string>();

  const hasQRText = qrText && qrText?.length;

  const handleQRReaderResult: OnResultFunction = (result, error) => {
    if (result) {
      setQrText(result?.getText());
    }

    if (error) {
      alert(error.toString());
    }
  };

  return (
    <main>
      {!hasQRText && (
        <div>
          <QrReader constraints={{ aspectRatio: 1 }} onResult={handleQRReaderResult} />
        </div>
      )}

      {hasQRText && (
        <>
          <h1>Подключение к игре</h1>

          <Button>Далее</Button>
        </>
      )}
    </main>
  );
};

export default ClientConnectionPage;
