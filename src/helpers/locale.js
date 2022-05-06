import switchLang from './switchLang.js'
import changeKeyboard from './changeKeyboard.js'
import en from '../layouts/en.js'
import ru from '../layouts/ru.js'

export default function locale(rows, ...codes) {
  const pressed = new Set()
  document.addEventListener('keydown', (event) => {
    pressed.add(event.code)

    for (let i = 0; i < codes.length; i += 1) {
      if (!pressed.has(codes[i])) {
        return
      }
    }

    pressed.clear()
    const layout = switchLang() === 'en' ? en : ru
    changeKeyboard('normal', layout, rows)
  })

  document.addEventListener('keyup', (event) => {
    pressed.delete(event.code)
  })
}
