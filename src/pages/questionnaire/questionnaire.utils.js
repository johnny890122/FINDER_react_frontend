export const isThisPageError = ({ thisPageFieldNames, values }) => {
  for (let i = 0; i < thisPageFieldNames.length; i += 1) {
    const fieldName = thisPageFieldNames[i]
    if (!values[fieldName]) return true
  }
  return false
}
