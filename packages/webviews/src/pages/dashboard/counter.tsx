import { useState } from 'react';
import { useTranslations } from 'use-intl';

export const Counter = () => {
  const [count, setCount] = useState(0);
  const countter = () => {
    setCount(count + 1);
  };

  const t = useTranslations('Counter');
  return (
    <div>
      <p>
        <span className="text-red-800">
          {t('count')}: {count}
        </span>
      </p>
      <p>
        <button onClick={countter}>{t('increment')}</button>
      </p>
    </div>
  );
};
