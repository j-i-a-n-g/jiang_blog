export const DateFilter = function(val) {
  const addZero = function(value) {
    if(value < 10) return `0${value}`
    return value
  }
  const y = addZero(new Date(val).getFullYear())
  const m = addZero(new Date(val).getMonth() + 1)
  const d = addZero(new Date(val).getDate())
  const hh = addZero(new Date(val).getHours())
  const mm = addZero(new Date(val).getMinutes())
  const ss = addZero(new Date(val).getSeconds())
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}