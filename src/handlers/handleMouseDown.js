import changeKeyboard from '../helpers/changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'
import randomDeg from '../helpers/randomDeg.js'
import setPropertyForStyle from '../helpers/setPropertyForStyle.js'

export default function handleMouseDown(rows, event) {
  const key = event.target.closest('.key')

  if (!key) return

  setPropertyForStyle('--random-deg', randomDeg)
  key.classList.add('active')

  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  const isCaps = JSON.parse(localStorage.getItem('caps'))
  const { code } = key.dataset

  if (/Shift/.test(code)) {
    if (isCaps) {
      changeKeyboard('capsOnShift', layout, rows)
    } else {
      changeKeyboard('shift', layout, rows)
    }
  }

  if (/CapsLock/.test(code)) {
    localStorage.setItem('caps', !isCaps)
    if (!isCaps) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }
  }
}
