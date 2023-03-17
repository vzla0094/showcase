export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const month = monthNames[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return { full: `${month} ${day}, ${year}`, month, day, year }
}
