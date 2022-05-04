import randomDeg from './randomDeg.js'

export default function handleMouseDown(event) {
  const key = event.target.closest('.key')
  if (!key) return
  document.getElementById('root').style.setProperty('--random-deg', randomDeg())
  key.classList.add('active')
}
