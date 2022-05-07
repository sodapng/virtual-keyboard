import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'

export default function handleClick(rows, event) {
  const key = event.target.closest('.key')
  if (!key) return
  key.classList.remove('active')

  if (key.id === 'caps') {
    key.classList.toggle('caps-lock--active')
  }

  const layout = localStorage.getItem('lang') === 'en' ? en : ru

  if (/Shift/.test(key.dataset.code)) {
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }

    return
  }

  if (key.classList.contains('lang')) {
    const lang = key.firstElementChild.dataset.content
    const isCaps = JSON.parse(localStorage.getItem('caps'))
    const mode = isCaps ? 'caps' : 'normal'

    if (lang === 'ru') {
      localStorage.setItem('lang', 'en')
      changeKeyboard(mode, en, rows)
    } else {
      localStorage.setItem('lang', 'ru')
      changeKeyboard(mode, ru, rows)
    }

    return
  }

  const textarea = document.querySelector('textarea')
  const pos = textarea.selectionStart
  const start = textarea.value.slice(0, pos)
  const end = textarea.value.slice(pos)

  if (/Escape|CapsLock|Shift|Control|Alt|Meta/.test(key.dataset.code)) {
    return
  }

  if (/Backspace/.test(key.dataset.code)) {
    if (pos === 0) {
      textarea.focus()
      return
    }
    textarea.value =
      textarea.value.slice(0, pos - 1) + textarea.value.slice(pos)
    textarea.setSelectionRange(pos - 1, pos - 1)
    textarea.focus()
    return
  }

  if (/Delete/.test(key.dataset.code)) {
    textarea.value =
      textarea.value.slice(0, pos) + textarea.value.slice(pos + 1)
    textarea.setSelectionRange(pos, pos)
    textarea.focus()
    return
  }

  if (/Enter/.test(key.dataset.code)) {
    textarea.value = `${start}\n${end}`
    textarea.setSelectionRange(pos + 1, pos + 1)
    textarea.focus()
    return
  }

  if (/Space/.test(key.dataset.code)) {
    textarea.value = `${start} ${end}`
    textarea.setSelectionRange(pos + 1, pos + 1)
    textarea.focus()
    return
  }

  if (/Tab/.test(key.dataset.code)) {
    textarea.value = `${start}\t${end}`
    textarea.setSelectionRange(pos + 1, pos + 1)
    textarea.focus()
    return
  }

  textarea.value = `${start}${key.firstElementChild.dataset.content}${end}`
  if (
    ['👆', '👈', '👇', '👉'].includes(key.firstElementChild.dataset.content)
  ) {
    textarea.setSelectionRange(pos + 2, pos + 2)
  } else {
    textarea.setSelectionRange(pos + 1, pos + 1)
  }

  textarea.focus()
}
