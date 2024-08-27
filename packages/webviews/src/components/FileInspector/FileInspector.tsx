import { useState } from 'react';
import { Inspector } from 'react-dev-inspector';
import { gotoServerEditor } from '../../utils/gotoServerEditor';

export const FileInspector = () => {
  const [active, setActive] = useState(false);

  return (
    <Inspector
      active={active}
      onActiveChange={setActive}
      onInspectElement={gotoServerEditor}
    >
      <div className="mx-auto max-w-2xl">
        <div className="text-center">
          <div className="mt-8 flex flex-col items-center justify-center gap-x-6">
            <div className="mb-2 mt-6 text-[min(4.5vw,1rem)] font-light leading-[min(6vw,1.75rem)] text-gray-600 sm:text-lg">
              try shortcuts or click ↓
            </div>

            <button
              className="group flex items-center text-[min(4vw,.875rem)] leading-[min(5vw,1.25rem)] sm:text-base"
              onClick={() => setActive(true)}
            >
              <span>Ctrl + Shift + Command + C</span>
              <span className="ml-1">🍭</span>
            </button>
          </div>
        </div>
      </div>
    </Inspector>
  );
};
