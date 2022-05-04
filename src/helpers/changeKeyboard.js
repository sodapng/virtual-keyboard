import forEach from './forEach.js'

export default function changeKeyboard(mode, layout, rows) {
  forEach(layout[mode], (i, row) => {
    forEach(row.split(' '), (j, el) => {
      rows[i].children[j].firstElementChild.setAttribute('data-content', el)
    })
  })
}
