import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'

export default function handleKeyUp(rows, event) {
  if (/^F/.test(event.code)) return
  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  const key = document.querySelector(`[data-code="${event.code}"]`)
  key.classList.remove('active')

  if (/Caps/.test(event.key)) {
    key.classList.toggle('caps-lock--active')
  }

  if (event.key === 'Shift') {
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }
  }
}
