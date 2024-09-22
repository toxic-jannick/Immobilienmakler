const translations = {
  en: null,
  de: null
};

async function loadTranslations() {
  const [en, de] = await Promise.all([
	fetch('/locales/en/translation.json').then(res => res.json()),
	fetch('/locales/de/translation.json').then(res => res.json())
  ]);

  translations.en = en;
  translations.de = de;
}

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
	const key = el.getAttribute('data-i18n');
	el.textContent = translations[lang][key];
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadTranslations();
  setLanguage('en'); // Standardsprache

  document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
  document.getElementById('lang-de').addEventListener('click', () => setLanguage('de'));
});