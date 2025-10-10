// form-script.js
(() => {
  try {
    Feathery.init('6a0d75fb-625b-4b75-a7ca-b1560c416685');

    const loginEnabled = true;
    Feathery.renderAt('container', { formId: 'cwBWeb' }, loginEnabled);
  } catch (err) {
    console.error('Feathery init/render error:', err);
    const c = document.getElementById('container');
    if (c) c.innerText = 'Failed to load the contact form. Please try again later.';
  }
})();
