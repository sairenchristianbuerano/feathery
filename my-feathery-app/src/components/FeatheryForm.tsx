// src/components/FeatheryForm.tsx
import React, { useEffect, useRef } from 'react';
import * as Feathery from '@feathery/react';

interface FeatheryFormProps {
  formId: string;
  apiKey: string;
  loginEnabled?: boolean;
}

const FeatheryForm: React.FC<FeatheryFormProps> = ({ formId, apiKey, loginEnabled = true }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    // guard: don't run on server
    if (typeof window === 'undefined') return;

    // ensure mount exists
    const mountEl = mountRef.current;
    if (!mountEl) {
      console.warn('FeatheryForm: mountRef not ready yet.');
      return;
    }

    // helper to delay until next frame so DOM attaching finishes
    const waitFrame = () =>
      new Promise<void>((resolve) => {
        // requestAnimationFrame ensures the browser has painted / attached the node
        requestAnimationFrame(() => resolve());
      });

    let cancelled = false;

    async function initAndRender() {
      try {
        await waitFrame();

        if (cancelled) return;

        const FeatheryAny = Feathery as any;

        if (!FeatheryAny || typeof FeatheryAny.init !== 'function') {
          console.warn('Feathery package loaded but init() not found.');
        } else {
          if (!window.__feathery_inited) {
            FeatheryAny.init(apiKey);
            window.__feathery_inited = true;
            console.debug('Feathery.init called');
          }
        }

        // defensive check mount is valid HTMLElement
        const el = mountRef.current;
        if (!el || !(el instanceof HTMLElement)) {
          throw new Error('Feathery mount element is not a valid HTMLElement at render time.');
        }

        // ensure id exists (some APIs prefer id)
        if (!el.id) el.id = `feathery-mount-${formId}-${Math.floor(Math.random() * 10000)}`;

        // If already rendered, skip
        if (renderedRef.current) {
          console.debug('FeatheryForm: already rendered, skipping.');
          return;
        }

        // Try rendering by passing the element first (safer)
        try {
          if (typeof FeatheryAny.renderAt === 'function') {
            console.debug('FeatheryForm: attempting renderAt with element', el);
            // some Feathery builds accept either element or id; pass element
            FeatheryAny.renderAt(el, { formId }, loginEnabled);
            renderedRef.current = true;
            console.debug('FeatheryForm: renderAt(element) succeeded');
            return;
          } else {
            throw new Error('Feathery.renderAt is not a function');
          }
        } catch (firstErr: any) {
          console.warn('Feathery.renderAt(el) failed:', firstErr);

          // If error indicates createRoot target problem, try id-string fallback
          const errMsg = String(firstErr?.message || firstErr);
          if (errMsg.includes('createRoot') || errMsg.includes('Target container')) {
            try {
              console.debug('FeatheryForm: retrying renderAt with id string:', el.id);
              // Some versions expect an id (string) instead of element
              FeatheryAny.renderAt(el.id, { formId }, loginEnabled);
              renderedRef.current = true;
              console.debug('FeatheryForm: renderAt(id) succeeded');
              return;
            } catch (secondErr) {
              console.error('Feathery.renderAt(id) also failed:', secondErr);
              throw secondErr;
            }
          } else {
            // not the createRoot error, rethrow
            throw firstErr;
          }
        }
      } catch (err: any) {
        console.error('Feathery error:', err);
        if (mountRef.current) {
          mountRef.current.innerText = 'Contact form failed to load. See console for details.';
        }
      }
    }

    initAndRender();

    return () => {
      cancelled = true;
      // If Feathery provides an unmount/destroy API in future, call it here.
      // renderedRef.current = false; // optional: allow re-render on remount
    };
  }, [apiKey, formId, loginEnabled]);

  // render mount element (renderedRef is controlled inside effect)
  return <div ref={mountRef} id={`feathery-mount-placeholder-${formId}`} style={{ minHeight: '100%' }} />;
};

export default FeatheryForm;
