const form = document.querySelector<HTMLFormElement>('#contact-form');
if (form) {
  const fields = form.querySelector<HTMLFieldSetElement>('.form-fields')!;
  const status = form.querySelector<HTMLElement>('.form-status')!;
  const buttonText = form.querySelector<HTMLElement>('.form-submit span')!;
  const success = document.querySelector<HTMLElement>('.form-success')!;
  const selected = new URLSearchParams(location.search).get('service');
  form.querySelectorAll<HTMLInputElement>('[data-service-id]').forEach((input) => {
    input.checked = input.dataset.serviceId === selected;
  });
  let pending = false;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (pending || !form.reportValidity()) return;
    const data = new FormData(form);
    const showSuccess = () => {
      form.hidden = true;
      success.hidden = false;
      success.focus();
    };
    if (String(data.get('website') || '').trim()) {
      showSuccess();
      return;
    }
    data.set('services', data.getAll('services').join(', '));
    data.set('language', form.dataset.locale || 'fr');
    data.set('_subject', 'Nouveau contact — Noveo Digital');
    data.delete('website');
    pending = true;
    status.hidden = true;
    fields.disabled = true;
    buttonText.textContent = form.dataset.sending || '';
    form.setAttribute('aria-busy', 'true');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        signal: controller.signal,
      });
      if (!response.ok) throw new Error('Submission failed');
      if (response.headers.get('content-type')?.includes('application/json')) {
        const result = await response.json();
        if (result.success === false || result.status === 'error')
          throw new Error('Submission rejected');
      }
      form.reset();
      showSuccess();
    } catch {
      status.textContent = form.dataset.error || '';
      status.hidden = false;
    } finally {
      clearTimeout(timeout);
      pending = false;
      fields.disabled = false;
      form.removeAttribute('aria-busy');
      buttonText.textContent = form.dataset.send || '';
    }
  });
  document.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    success.hidden = true;
    form.hidden = false;
    status.hidden = true;
    form.querySelector<HTMLInputElement>('#name')?.focus();
  });
}
