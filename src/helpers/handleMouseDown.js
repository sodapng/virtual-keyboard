import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'
import randomDeg from './randomDeg.js'

export default function handleMouseDown(rows, event) {
  const key = event.target.closest('.key')
  if (!key) return
  document.getElementById('root').style.setProperty('--random-deg', randomDeg())
  key.classList.add('active')

  const layout = localStorage.getItem('lang') === 'en' ? en : ru

  if (/Shift/.test(key.dataset.code)) {
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('capsOnShift', layout, rows)
    } else {
      changeKeyboard('shift', layout, rows)
    }
  } else if (/CapsLock/.test(key.dataset.code)) {
    localStorage.setItem('caps', !JSON.parse(localStorage.getItem('caps')))
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }
  }
}
