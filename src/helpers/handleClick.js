export default function handleClick(event) {
  const key = event.target.closest('.key')
  if (!key) return
  key.classList.remove('active')

  if (key.id === 'caps') {
    key.classList.toggle('caps-lock--active')
  }

  const textarea = document.querySelector('textarea')
  if (/Escape|Delete|CapsLock|Shift|Control|Alt|Meta/.test(key.dataset.code)) {
    return
  }

  const pos = textarea.selectionStart
  if (/Backspace/.test(key.dataset.code)) {
    textarea.value =
      textarea.value.slice(0, pos - 1) + textarea.value.slice(pos)
    textarea.setSelectionRange(pos - 1, pos - 1)
    textarea.focus()
    return
  }

  if (/Enter/.test(key.dataset.code)) {
    textarea.value += '\n'
    return
  }

  if (/Space/.test(key.dataset.code)) {
    textarea.value += ' '
    return
  }

  if (/Tab/.test(key.dataset.code)) {
    textarea.value += '\t'
    return
  }

  textarea.value =
    textarea.value.slice(0, pos) +
    key.firstElementChild.dataset.content +
    textarea.value.slice(pos)

  textarea.setSelectionRange(pos + 1, pos + 1)
  textarea.focus()
}
