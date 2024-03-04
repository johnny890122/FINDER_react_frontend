import { isThisPageError } from './questionnaire.utils'

describe('isThisPageError', () => {
  it('any field in this page is not filled, return true', () => {
    const thisPageFieldNames = ['age', 'gender']
    const values = { age: '21', gender: null }
    expect(isThisPageError({ thisPageFieldNames, values })).toBe(true)
  })
  it('all fields in this page is filled, return false', () => {
    const thisPageFieldNames = ['age', 'gender']
    const values = { age: '21', gender: 'MALE' }
    expect(isThisPageError({ thisPageFieldNames, values })).toBe(false)
  })
})
