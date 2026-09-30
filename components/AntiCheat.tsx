'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  candidateName: string;
  maxTabSwitches: number;
  onTabSwitchExceeded: () => void; // called once limit is hit — parent decides what to do
  children: React.ReactNode;
};

/**
 * Wraps the test screen with browser-level restrictions.
 * IMPORTANT: none of this can block OS-level screenshots (Print Screen / phone camera).
 * Browsers have no API for that — this only deters/detects/logs, plus a visible watermark
 * so any screenshot is traceable back to the candidate.
 */
export default function AntiCheat({ candidateName, maxTabSwitches, onTabSwitchExceeded, children }: Props) {
  const [tabSwitches, setTabSwitches] = useState(0);
  const exceededRef = useRef(false);

  useEffect(() => {
    // Block right-click menu
    const blockContext = (e: MouseEvent) => e.preventDefault();

    // Block copy / cut / paste / drag of content
    const blockClipboard = (e: ClipboardEvent) => e.preventDefault();
    const blockSelectStart = (e: Event) => e.preventDefault();
    const blockDrag = (e: DragEvent) => e.preventDefault();

    // Block common shortcuts: copy, paste, save, print, view-source, devtools
    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const blockedCombos =
        ((e.ctrlKey || e.metaKey) && ['c', 'v', 'x', 'u', 's', 'p'].includes(key)) ||
        key === 'f12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(key)) ||
        key === 'printscreen';
      if (blockedCombos) e.preventDefault();
    };

    // Count tab switches / window blur as a proxy for leaving the test
    const handleVisibility = () => {
      if (document.hidden) {
        setTabSwitches((prev) => {
          const next = prev + 1;
          if (next >= maxTabSwitches && !exceededRef.current) {
            exceededRef.current = true;
            onTabSwitchExceeded();
          }
          return next;
        });
      }
    };

    document.addEventListener('contextmenu', blockContext);
    document.addEventListener('copy', blockClipboard);
    document.addEventListener('cut', blockClipboard);
    document.addEventListener('paste', blockClipboard);
    document.addEventListener('selectstart', blockSelectStart);
    document.addEventListener('dragstart', blockDrag);
    document.addEventListener('keydown', blockKeys);
    document.addEventListener('visibilitychange', handleVisibility);

    // Best-effort full-screen request (user gesture required, so this may silently no-op)
    document.documentElement.requestFullscreen?.().catch(() => {});

    return () => {
      document.removeEventListener('contextmenu', blockContext);
      document.removeEventListener('copy', blockClipboard);
      document.removeEventListener('cut', blockClipboard);
      document.removeEventListener('paste', blockClipboard);
      document.removeEventListener('selectstart', blockSelectStart);
      document.removeEventListener('dragstart', blockDrag);
      document.removeEventListener('keydown', blockKeys);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [maxTabSwitches, onTabSwitchExceeded]);

  return (
    <div className="relative select-none" style={{ WebkitUserSelect: 'none', userSelect: 'none' }}>
      {/* Tiled watermark — traces any screenshot back to the candidate */}
      <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.06]">
        <div
          className="grid h-[200%] w-[200%] -rotate-[20deg] grid-cols-4 gap-16 text-sm font-semibold text-telth-purple"
          style={{ transform: 'translate(-25%,-25%) rotate(-20deg)' }}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap">
              {candidateName || 'TELTH CANDIDATE'} · {new Date().toLocaleDateString()}
            </span>
          ))}
        </div>
      </div>

      {tabSwitches > 0 && (
        <div className="fixed left-1/2 top-3 z-50 -translate-x-1/2 rounded-full bg-red-600 px-4 py-1 text-xs font-medium text-white shadow-lg">
          Tab switch detected ({tabSwitches}/{maxTabSwitches}) — this is logged
        </div>
      )}

      {children}
    </div>
  );
}
