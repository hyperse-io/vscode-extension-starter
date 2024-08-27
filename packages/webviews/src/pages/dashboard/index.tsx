import { createRoot } from 'react-dom/client';
import { FileInspector } from '../../components/FileInspector/FileInspector';
import { Dashboard } from './Dashboard';
import '@/style/global.css';

document.addEventListener('DOMContentLoaded', () => {
  const root = createRoot(document.getElementById('app') as HTMLElement);
  root.render(
    <>
      {process.env.NODE_ENV === 'development' ? <FileInspector /> : null}
      <Dashboard />
    </>
  );
});
