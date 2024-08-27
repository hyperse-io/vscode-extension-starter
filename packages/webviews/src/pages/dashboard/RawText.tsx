import { useTranslations } from 'use-intl';

export const RawText = () => {
  const t = useTranslations('Index');

  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: t.raw('rich') }}
        data-testid="RawText"
      />
      <p data-testid="RichText">
        {t.rich('rich', { important: (chunks) => <b>{chunks}</b> })}
      </p>
      <p data-testid="global">{t.rich('globalDefaults')}</p>
      <p data-testid="global1">
        {t.rich('globalDefaults', {
          highlight: (chunks) => <b className="text-red-600">{chunks}</b>,
          globalString: 'this is customized string',
        })}
      </p>
    </div>
  );
};
