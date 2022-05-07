import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { PlayerConnection } from '../../model/connections';

type Props = {
  className?: string;
};

export const TestRtcPage = observer(function TestRtcPage({ className }: Props) {
  const [connection] = React.useState(() => new PlayerConnection());

  React.useEffect(() => {
    // @ts-ignore
    window.__connection = connection;
  }, [connection]);

  return (
    <div className={cn(className)}>
      <h4>Прототип соединения</h4>
      <>Можно открыть 2 вкладки в браузере, и через windows.__connection вызывать методы для соединения!</>
    </div>
  );
});
