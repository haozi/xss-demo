import {
  ADD_FOO,
} from '../mutation-types'

const mutations = {
  [ADD_FOO](state, value) {
    console.info(value)
    state.data.push(value)
  }
}

export default {
  state: {
    data: [1, 2, 3]
  },
  mutations
}
