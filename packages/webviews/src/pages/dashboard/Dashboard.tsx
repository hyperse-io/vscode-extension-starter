import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { I18nProvider } from '@/components/I18nProvider';
import { strCamelCase } from '@dimjs/utils';
import {
  VSCodeButton,
  VSCodeDropdown,
  VSCodeOption,
} from '@vscode/webview-ui-toolkit/react';
import { vscode } from '../../utils/vscode';
import { Counter } from './counter';
import { Datetime } from './Datetime';
import style from './index.module.css';
import { RawText } from './RawText';
import { Translation } from './Translation';
import './index.less';

export const Dashboard = () => {
  const [locale, setLocale] = useState<string>(
    localStorage.getItem('lang') || 'zh'
  );

  const handleLocaleChange = async (locale) => {
    setLocale(locale);
  };

  function handleHowdyClick() {
    vscode.postMessage({
      command: 'hello',
      text: 'Hey there partner! 🤠',
    });
  }

  return (
    <I18nProvider locale={locale}>
      <div>
        <p className="font-semibold text-red-700">
          This is example template with i18n &nbsp;
        </p>
        <hr />
        <div className="flat-font">{strCamelCase('dddd ddd')}</div>
        <div className={twMerge('m-2 text-red-800', style.brand)}>
          this is css modules sample 0----dfsjkfjsfj
        </div>
        <div className={twMerge('flex items-center')}>
          <div className={twMerge('mx-1')}>locale:</div>
          <VSCodeButton appearance="primary" onClick={handleHowdyClick}>
            button
          </VSCodeButton>
          <VSCodeDropdown
            className="w-80"
            value={locale}
            onChange={(e) => {
              handleLocaleChange(e.target.value);
            }}
          >
            <VSCodeOption value="en">English</VSCodeOption>
            <VSCodeOption value="zh">简体中文</VSCodeOption>
          </VSCodeDropdown>
        </div>
        <hr />
        <Translation />
        <hr />
        <Counter />
        <hr />
        <Datetime />
        <hr />
        <RawText />
      </div>
    </I18nProvider>
  );
};
