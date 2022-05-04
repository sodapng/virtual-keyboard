export default function switchLang() {
  const lang = localStorage.getItem('lang')

  if (lang === 'en') {
    localStorage.setItem('lang', 'ru')
  } else if (lang === 'ru') {
    localStorage.setItem('lang', 'en')
  }

  return localStorage.getItem('lang')
}
