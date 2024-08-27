import { useTranslations } from 'use-intl';

export const Translation = () => {
  const t = useTranslations('Nested');
  return (
    <div>
      <p>
        title:
        {t('children.title')}
      </p>
      <p></p>
    </div>
  );
};
