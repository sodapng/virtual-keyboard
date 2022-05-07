import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'
import randomDeg from './randomDeg.js'

localStorage.setItem('caps', false)

export default function handleKeyDown(rows, event) {
  if (/^F/.test(event.code) || event.repeat) return

  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  document.getElementById('root').style.setProperty('--random-deg', randomDeg())
  const key = document.querySelector(`[data-code="${event.code}"]`)
  key.classList.add('active')
  const textarea = document.querySelector('textarea')

  if (event.code === 'Tab') {
    event.preventDefault()
    if (/Tab/.test(key.dataset.code)) {
      textarea.value += '\t'
      textarea.focus()
      return
    }
  }

  if (/Arrow/gi.test(event.code)) {
    event.preventDefault()
    const pos = textarea.selectionStart
    const start = textarea.value.slice(0, pos)
    const end = textarea.value.slice(pos)
    textarea.value = `${start}${key.firstElementChild.dataset.content}${end}`
    if (
      ['👆', '👈', '👇', '👉'].includes(key.firstElementChild.dataset.content)
    ) {
      textarea.setSelectionRange(pos + 2, pos + 2)
    } else {
      textarea.setSelectionRange(pos + 1, pos + 1)
    }

    textarea.focus()
    return
  }

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
