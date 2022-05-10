import changeKeyboard from '../helpers/changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'
import randomDeg from '../helpers/randomDeg.js'
import setPropertyForStyle from '../helpers/setPropertyForStyle.js'

export default function handleKeyDown(rows, textarea, event) {
  const { code } = event
  if (
    /^F|Context|Scroll|Pause|Insert|Page|Home|End|Num/.test(code) ||
    event.repeat
  )
    return

  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  const isCaps = JSON.parse(localStorage.getItem('caps'))
  setPropertyForStyle('--random-deg', randomDeg)
  const key = document.querySelector(`[data-code="${code}"]`)
  key.classList.add('active')

  if (event.ctrlKey || /Backspace|Delete|Esc|Meta|Space|Enter|Equal|Minus/i.test(code)) {
    return
  }

  if (/Alt/.test(code)) {
    event.preventDefault()
    return
  }

  if (/Shift/.test(code)) {
    if (isCaps) {
      changeKeyboard('capsOnShift', layout, rows)
    } else {
      changeKeyboard('shift', layout, rows)
    }

    return
  }

  if (/CapsLock/.test(code)) {
    localStorage.setItem('caps', !isCaps)
    if (!isCaps) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }

    return
  }

  let positionOfCursor = textarea.selectionStart
  const selectedStartValue = textarea.value.slice(0, positionOfCursor)
  const selectedEndValue = textarea.value.slice(positionOfCursor)
  let value = key.firstElementChild.dataset.content

  if (/Key|Digit|Slash|Comma|Period|Bracket|Semicolon|Quote/i.test(code)) {
    event.preventDefault()
  }

  if (/Tab/.test(code)) {
    event.preventDefault()
    value = `\t`
  }

  if (/Arrow/.test(code)) {
    event.preventDefault()
    if (['👆', '👈', '👇', '👉'].includes(value)) {
      positionOfCursor += 1
    }
  }

  textarea.value = `${selectedStartValue}${value}${selectedEndValue}`
  textarea.setSelectionRange(positionOfCursor + 1, positionOfCursor + 1)
  textarea.focus()
}
