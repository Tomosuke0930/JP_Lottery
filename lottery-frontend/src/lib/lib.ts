export const shortenAddress = (str: string | null, front = 5, end = 3) => {
  if (str) {
    return `${str.slice(0, front)}...${str.slice(str.length - end)}`
  }
  return ''
}
