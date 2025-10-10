/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FEATHERY_KEY: string;
  readonly VITE_FEATHERY_FORM_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// src/global.d.ts
export {}; // keep file a module so `declare global` augments the global scope

declare global {
  interface Window {
    __feathery_inited?: boolean;
  }
}
