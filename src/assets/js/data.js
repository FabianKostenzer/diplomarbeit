import { ref } from '@vue/reactivity'
import store from '../../store/index'
import { watch } from 'vue'
import axios from 'axios'

// makes sure to load data after login
watch(
  () => store.state.userId,
  () => {
    if (store.state.userId !== null) {
      loadUserData(userData)
    }
  }
)
// gets user data from API, extends it by skill and levels key
async function loadUserData(userData) {
  const res = await axios.get('http://localhost:3000/user', {
    params: {
      userId: store.state.userId
    }
  })
  userData.value = await res.data
  calculateLevelDistribution(userData)
  calculateSkillValue(userData)
}

// adds skill key to fetched JSON, overall skill in percentage
function calculateSkillValue(userData) {
  let sum = 0
  userData.value.levels.forEach((level, i) => {
    sum += level * (1 - 0.25 * i)
  })
  userData.value.skill = sum | 0
}

// adds levels key to fetched JSON, Array with percentages of certain level
function calculateLevelDistribution(userData) {
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
export { userData, loadUserData }
