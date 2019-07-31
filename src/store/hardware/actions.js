import * as types from '@/store/hardware/mutation-types'

// 设置当前时间信息
export function setHardwareDate ({ commit }, info) {
  commit(types.SET_HARDWARE_DATE, info)
}

// 设置未来4天天气信息
export function setFutureWeather ({ commit }, info) {
  commit(types.SET_FUTURE_WEATHER, info)
}

// 设置当前天气信息
export function setHardwareWeather ({ commit }, info) {
  commit(types.SET_HARDWARE_WEATER, info)
}

// 设置当前位置信息
export function setHardwarePosition ({ commit }, info) {
  commit(types.SET_HARDWARE_POSITION, info)
}
