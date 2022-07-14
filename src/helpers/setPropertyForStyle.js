export default function setPropertyForStyle(property, fn) {
  document.getElementById('root').style.setProperty(property, fn())
}
