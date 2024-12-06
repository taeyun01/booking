// 3자리마다 콤마를 찍어주는 함수
const addDelimiter = (value: number | string, delimiter = ',') => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter)
}

export default addDelimiter
