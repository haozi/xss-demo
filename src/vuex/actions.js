import {
  ADD_FOO,
} from './mutation-types'

export function addFoo({commit}, value) {
  commit(ADD_FOO, value)
}
