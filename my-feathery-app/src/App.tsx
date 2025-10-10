import React, { useState } from 'react';
import Navbar from './components/Navbar';
import ModalBasic from './components/ModalBasic';
import FeatheryForm from './components/FeatheryForm';

export default function App() {
  const [open, setOpen] = useState(false);

  // prefer to store sensitive keys in env; fallback to value directly for quick dev
  const FEATHERY_FORM_ID = import.meta.env.VITE_FEATHERY_FORM_ID ?? 'cwBWeb';
  const FEATHERY_API_KEY = import.meta.env.VITE_FEATHERY_KEY ?? '6a0d75fb-625b-4b75-a7ca-b1560c416685';

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onContact={() => setOpen(true)} />

      <main className="pt-20 max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
        <p className="text-gray-700">
          Page content goes here. Click Contact to open the Feathery form in a modal.
        </p>
      </main>

      <ModalBasic isOpen={true} onClose={() => setOpen(false)} title="Contact Us">
        <div className="h-[60vh]">
          <FeatheryForm formId={FEATHERY_FORM_ID} apiKey={FEATHERY_API_KEY} loginEnabled={true}  />
        </div>
      </ModalBasic>
    </div>
  );
}
