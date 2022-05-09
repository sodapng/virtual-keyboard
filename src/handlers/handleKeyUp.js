import changeKeyboard from '../helpers/changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'

export default function handleKeyUp(rows, event) {
  const { code } = event

  if (/^F|Context|Scroll|Pause|Insert|Page|Home|End|Num/.test(code)) return

  const layout = localStorage.getItem('lang') === 'en' ? en : ru
  const key = document.querySelector(`[data-code="${code}"]`)
  key.classList.remove('active')

  if (/Caps/.test(code)) {
    key.classList.toggle('caps-lock--active')
  }

  if (/Shift/.test(code)) {
    if (JSON.parse(localStorage.getItem('caps'))) {
      changeKeyboard('caps', layout, rows)
    } else {
      changeKeyboard('normal', layout, rows)
    }
  }
}
