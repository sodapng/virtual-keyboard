import switchLang from './switchLang.js'
import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'
import forEach from './forEach.js'

export default function locale(rows, ...codes) {
  const pressed = new Set()
  document.addEventListener('keydown', (event) => {
    pressed.add(event.code)

    forEach(codes, (i, code) => {
      if (!pressed.has(code)) {
        return undefined
      }

      return undefined
    })

    pressed.clear()
    const layout = switchLang() === 'en' ? en : ru
    changeKeyboard('normal', layout, rows)
  })

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code)
  })
}
