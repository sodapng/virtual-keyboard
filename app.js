import keyboardHTML from './templates/keyboard.js'
import en from './layouts/en.js'
import ru from './layouts/ru.js'
import handleMouseDown from './handlers/handleMouseDown.js'
import handleClick from './handlers/handleClick.js'
import changeKeyboard from './helpers/changeKeyboard.js'

async function runApp() {
  localStorage.setItem('lang', localStorage.getItem('lang') || 'en')
  localStorage.setItem('caps', false)
  const layout = localStorage.getItem('lang') === 'en' ? en : ru

  const root = document.getElementById('root')
  root.insertAdjacentHTML('afterbegin', keyboardHTML)

  const rows = document.querySelectorAll('.row')
  const keyboard = document.querySelector('.keyboard')
  const textarea = document.querySelector('textarea')

  const { default: handleKeyDown } = await import('./handlers/handleKeyDown.js')
  const { default: handleKeyUp } = await import('./handlers/handleKeyUp.js')
  const { default: locale } = await import('./helpers/locale.js')

  keyboard.addEventListener('mousedown', handleMouseDown.bind(this, rows))
  keyboard.addEventListener('click', handleClick.bind(this, rows, textarea))
  document.addEventListener('keydown', handleKeyDown.bind(this, rows, textarea))
  document.addEventListener('keyup', handleKeyUp.bind(this, rows))

  changeKeyboard('normal', layout, rows)
  locale(rows, 'AltLeft', 'ShiftLeft')
  textarea.placeholder = 'Привет, Брат!\nОтпишись, пожалуйста, в дискорде, если заметишь ошибку!\nDiscrod: @Нюкта#3603'
}

runApp()
