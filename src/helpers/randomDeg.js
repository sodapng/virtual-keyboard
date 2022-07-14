const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export default function randomDeg() {
  return `${random(90, 225)}deg`
}
