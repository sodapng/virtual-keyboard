import changeKeyboard from '../helpers/changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'

export default function handleClick(rows, event) {
  const key = event.target.closest('.key')

  if (!key) {
    document.querySelector('.active')?.classList.remove('active')
    return
  }

  const { code } = key.dataset
  key.classList.remove('active')

  if (key.id === 'caps') {
    key.classList.toggle('caps-lock--active')
  }

  if (/Escape|CapsLock|Control|Alt|Meta/.test(code)) {
    return
  }

  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  const isCaps = JSON.parse(localStorage.getItem('caps'))

  if (/Shift/.test(code)) {
    if (isCaps) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }

    return
  }

  let { content } = key.firstElementChild.dataset

  if (key.classList.contains('lang')) {
    const mode = isCaps ? 'caps' : 'normal'

    if (content === 'ru') {
      localStorage.setItem('lang', 'en')
      changeKeyboard(mode, en, rows)
    } else {
      localStorage.setItem('lang', 'ru')
      changeKeyboard(mode, ru, rows)
    }

    return
  }

  const textarea = document.querySelector('textarea')
  let positionOfCursor = textarea.selectionStart
  let selectedStartValue = textarea.value.slice(0, positionOfCursor)
  let selectedEndValue = textarea.value.slice(positionOfCursor)

  if (/Backspace/.test(code)) {
    if (!positionOfCursor) {
      textarea.focus()
      return
    }

    selectedStartValue = selectedStartValue.slice(0, positionOfCursor - 1)
    content = ''
    positionOfCursor -= 2
  }

  if (/Delete/.test(code)) {
    selectedEndValue = selectedEndValue.slice(1)
    content = ''
    positionOfCursor -= 1
  }

  if (/Enter/.test(code)) {
    content = `\n`
  }

  if (/Space/.test(code)) {
    content = ` `
  }

  if (/Tab/.test(code)) {
    content = `\t`
  }

  if (['👆', '👈', '👇', '👉'].includes(content)) {
    positionOfCursor += 1
  }

  textarea.value = `${selectedStartValue}${content}${selectedEndValue}`
  textarea.setSelectionRange(positionOfCursor + 1, positionOfCursor + 1)
  textarea.focus()
}
