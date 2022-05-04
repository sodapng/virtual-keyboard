import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'
import randomDeg from './randomDeg.js'

localStorage.setItem('caps', false)

export default function handleKeyDown(rows, event) {
  if (/^F/.test(event.code) || event.repeat) return
  if (event.code === 'Tab') {
    event.preventDefault()
  }

  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  document.getElementById('root').style.setProperty('--random-deg', randomDeg())
  document.querySelector(`[data-code="${event.code}"]`).classList.add('active')
  if (event.key === 'Shift') {
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('capsOnShift', layout, rows)
    } else {
      changeKeyboard('shift', layout, rows)
    }
  } else if (event.key === 'CapsLock') {
    localStorage.setItem('caps', !JSON.parse(localStorage.getItem('caps')))
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }
  }
}
