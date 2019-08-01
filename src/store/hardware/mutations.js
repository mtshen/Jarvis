import * as types from './mutation-types'

export default {
  // 设置当前时间信息
  [types.SET_HARDWARE_DATE] (state, dateInfo) {
    state.hardwareDate = Object.assign({}, state.hardwareDate, dateInfo)
  },
  // 设置当前天气信息
  [types.SET_HARDWARE_WEATER] (state, weaterInfo) {
    state.hardwareWeather = Object.assign({}, state.hardwareWeather, weaterInfo)
  },
  // 设置当前位置信息
  [types.SET_HARDWARE_POSITION] (state, positionInfo) {
    state.hardwarePosition = Object.assign({}, state.hardwarePosition, positionInfo)
  },
  // 设置未来4天天气信息
  [types.SET_FUTURE_WEATHER] (state, futureWeatherInfo) {
    state.hardwareFutureWeather = Object.assign({}, state.hardwareFutureWeather, futureWeatherInfo)
  }
}
