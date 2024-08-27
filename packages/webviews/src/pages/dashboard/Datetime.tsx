import { useFormatter, useNow, useTimeZone } from 'use-intl';

export const Datetime = () => {
  const format = useFormatter();
  const timeZone = useTimeZone();
  const now = useNow();

  return (
    <div>
      <p data-testid="CurrentTime">
        {format.dateTime(now, 'medium')} ({timeZone || 'N/A'})
      </p>
      <p data-testid="CurrentTimeRelative">{format.relativeTime(now)}</p>
      <p data-testid="Number">
        {format.number(23102, { style: 'currency', currency: 'EUR' })}
      </p>
    </div>
  );
};
