import { ref } from '@vue/reactivity'
async function loadUserData(userData) {
  const res = await fetch('http://localhost:3000/user')
  const data = await res.json()
  userData.value = data
  calculateLevels(userData)
  calculateSkillValue(userData)
}

function calculateSkillValue(userData) {
  let sum = 0
  userData.value.levels.forEach((level, i) => {
    // valueFactors: 1, 0.75, 0.5, 0.25, 0
    sum += level * (1 - 0.25 * i)
  })
  userData.value.skill = sum | 0
}

function calculateLevels(userData) {
  let recordsAmount = 0
  const levels = [0, 0, 0, 0, 0]
  userData.value.topics.forEach(topic => {
    topic.records.forEach(record => {
      recordsAmount++
      levels[record.level - 1]++
    })
  })
  userData.value.levels = levels.map(level => (level / recordsAmount) * 100)
}

const userData = ref(null)
loadUserData(userData)
export { userData, loadUserData }
