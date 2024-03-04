import { useState, useRef } from 'react'
import { Formik } from 'formik'
import styled from '@emotion/styled'

import { color } from '../../styles'
import { Button, FormControl, Input } from '../../components'
import Start from '../../assets/start.svg'
import Complete from '../../assets/complete.svg'
import { initialValues, validationSchema } from './questionnaire.config'
import { isThisPageError } from './questionnaire.utils'
import { QuestionRadioGroup } from './QuestionRadioGroup'

const generalIntervalOptions = [
  { value: '0.2', label: '最低的 20%' },
  { value: '0.4', label: '20% 至 40%' },
  { value: '0.6', label: '40% 至 60%' },
  { value: '0.8', label: '60% 至 80%' },
  { value: '1', label: '最高的 20%' },
]
const generalPossibilityOptions = [
  { value: '1', label: '非常不可能' },
  { value: '2', label: '不可能' },
  { value: '3', label: '沒意見' },
  { value: '4', label: '可能' },
  { value: '5', label: '非常可能' },
]

export const Questionnaire = () => {
  const [pageIndex, setPageIndex] = useState(0)
  const [onClickButtonIndex, setOnClickButtonIndex] = useState(null)
  const ref = useRef(null)

  const scrollToTop = () => ref.current.scrollIntoView()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange
      onSubmit={values => console.log(values)}
    >
      {({ values, handleChange, submitForm }) => (
        <StyledContainer ref={ref}>
          {pageIndex === 0 && (
            <StyledBox>
              <StyledPageTitle>恭喜您完成遊戲！</StyledPageTitle>
              <StyledPageSubtitle>
                接下來我們將會詢問您一些問題，作為參考的依據，填答完畢後將會把報酬相關資訊寄信到您填寫的 Email 地址。
                <br />
                如您準備好了，就請開始填答吧！
              </StyledPageSubtitle>
              <StyledImageContainer>
                <img src={Start} style={{ height: 300, width: 250 }} alt="start" />
              </StyledImageContainer>
              <StyledButtonsContainer>
                <Button
                  onClick={() => {
                    setPageIndex(() => pageIndex + 1)
                    scrollToTop()
                  }}
                >
                  開始填答
                </Button>
              </StyledButtonsContainer>
            </StyledBox>
          )}
          {pageIndex === 1 && (
            <StyledBox>
              <StyledPageTitle>您的基本資料</StyledPageTitle>
              <StyledFormContentContainer>
                <FormControl title="請問您的性別是">
                  <QuestionRadioGroup
                    name="gender"
                    options={[
                      { value: 'male', label: '男性' },
                      { value: 'female', label: '女性' },
                      { value: 'other', label: '其他' },
                    ]}
                    value={values.gender}
                    handleChange={handleChange}
                  />
                </FormControl>
                <FormControl title="請輸入您的年齡">
                  <Input name="age" value={values.age} onChange={handleChange} />
                </FormControl>
                <FormControl title="請問您的教育程度是">
                  <QuestionRadioGroup
                    name="education"
                    options={[
                      { value: 'JUNIOR_HIGH', label: '國中' },
                      { value: 'SENIOR_HIGH', label: '高中' },
                      { value: 'BACHELOR', label: '大學' },
                      { value: 'MASTER', label: '碩士' },
                      { value: 'DOCTERAL', label: '博士' },
                    ]}
                    value={values.education}
                    handleChange={handleChange}
                  />
                </FormControl>
                <FormControl title="請問以收入而言，您個人（單身）或是家戶（已婚）的經濟狀況在全國排名中，您覺得會落在哪個區間？">
                  <QuestionRadioGroup
                    name="incomeLevel"
                    options={generalIntervalOptions}
                    value={values.incomeLevel}
                    handleChange={handleChange}
                  />
                </FormControl>
                <FormControl title="請問以受人尊重的程度而言，您從事的職業，在所有職業的社會地位排名中，您覺得大概會落在哪個區間？">
                  <QuestionRadioGroup
                    name="respected"
                    options={generalIntervalOptions}
                    value={values.respected}
                    handleChange={handleChange}
                  />
                </FormControl>
              </StyledFormContentContainer>
              <StyledButtonsContainer>
                <StyledNextPageContainer>
                  <StyledError>
                    {onClickButtonIndex === 1 &&
                      isThisPageError({
                        thisPageFieldNames: ['gender', 'age', 'education', 'incomeLevel', 'respected'],
                        values,
                      }) &&
                      '請填寫完所有欄位再按下一頁'}
                  </StyledError>
                  <Button
                    onClick={() => {
                      setOnClickButtonIndex(1)
                      if (
                        !isThisPageError({
                          thisPageFieldNames: ['gender', 'age', 'education', 'incomeLevel', 'respected'],
                          values,
                        })
                      ) {
                        setPageIndex(() => pageIndex + 1)
                        scrollToTop()
                      }
                    }}
                  >
                    下一頁
                  </Button>
                </StyledNextPageContainer>
                <Button
                  onClick={() => {
                    setPageIndex(() => pageIndex - 1)
                    scrollToTop()
                  }}
                >
                  回到上一頁
                </Button>
              </StyledButtonsContainer>
            </StyledBox>
          )}
          {pageIndex === 2 && (
            <StyledBox>
              <StyledPageTitle>您對 AI 的看法</StyledPageTitle>
              <StyledPageSubtitle>接下來我們會請您回答幾個關於人工智慧（AI）的問題</StyledPageSubtitle>
              <StyledFormContentContainer>
                <FormControl title="請問您在剛剛的實驗測試中，對於我們所提供的「AI 幫手」的表現，印象如何？">
                  <QuestionRadioGroup
                    name="aiFinderPerformance"
                    options={[
                      { value: '1', label: '表現非常差' },
                      { value: '2', label: '表現差' },
                      { value: '3', label: '沒感覺' },
                      { value: '4', label: '表現好' },
                      { value: '5', label: '表現非常好' },
                    ]}
                    value={values.aiFinderPerformance}
                    handleChange={handleChange}
                  />
                </FormControl>
                <FormControl title="請問您支持用 AI 來協助執法單位偵察犯罪嗎？">
                  <QuestionRadioGroup
                    name="aiSupportLevel"
                    options={[
                      { value: '1', label: '非常不支持' },
                      { value: '2', label: '不支持' },
                      { value: '3', label: '沒意見' },
                      { value: '4', label: '支持' },
                      { value: '5', label: '非常支持' },
                    ]}
                    value={values.aiSupportLevel}
                    handleChange={handleChange}
                  />
                </FormControl>
                <FormControl title="若是用 AI 來協助執法單位偵察犯罪，您覺得可以信賴 AI 所做的決定嗎？">
                  <QuestionRadioGroup
                    name="aiTrustLevel"
                    options={[
                      { value: '1', label: '非常不信賴' },
                      { value: '2', label: '不信賴' },
                      { value: '3', label: '沒意見' },
                      { value: '4', label: '信賴' },
                      { value: '5', label: '非常信賴' },
                    ]}
                    value={values.aiTrustLevel}
                    handleChange={handleChange}
                  />
                </FormControl>
                <FormControl title="您覺得未來 AI 是否有可能取代真人執法人員（像是警察）來執行偵察犯罪的任務？">
                  <StyledFormSubtitle>分析誰是嫌疑犯</StyledFormSubtitle>
                  <QuestionRadioGroup
                    name="aiFindSuspect"
                    options={generalPossibilityOptions}
                    value={values.aiFindSuspect}
                    handleChange={handleChange}
                  />
                  <StyledFormSubtitle>分析誰是主謀</StyledFormSubtitle>
                  <QuestionRadioGroup
                    name="aiFindMastermind"
                    options={generalPossibilityOptions}
                    value={values.aiFindMastermind}
                    handleChange={handleChange}
                  />
                  <StyledFormSubtitle>擬定破案計畫</StyledFormSubtitle>
                  <QuestionRadioGroup
                    name="aiDrawPlan"
                    options={generalPossibilityOptions}
                    value={values.aiDrawPlan}
                    handleChange={handleChange}
                  />
                  <StyledFormSubtitle>提供攻堅任務協助</StyledFormSubtitle>
                  <QuestionRadioGroup
                    name="aiSupportTask"
                    options={generalPossibilityOptions}
                    value={values.aiSupportTask}
                    handleChange={handleChange}
                  />
                </FormControl>
              </StyledFormContentContainer>
              <StyledButtonsContainer>
                <StyledNextPageContainer>
                  <StyledError>
                    {onClickButtonIndex === 2 &&
                      isThisPageError({
                        thisPageFieldNames: [
                          'aiFinderPerformance',
                          'aiSupportLevel',
                          'aiTrustLevel',
                          'aiFindSuspect',
                          'aiFindMastermind',
                          'aiDrawPlan',
                          'aiSupportTask',
                        ],
                        values,
                      }) &&
                      '請填寫完所有欄位再按下一頁'}
                  </StyledError>
                  <Button
                    onClick={() => {
                      setOnClickButtonIndex(2)
                      if (
                        !isThisPageError({
                          thisPageFieldNames: [
                            'aiFinderPerformance',
                            'aiSupportLevel',
                            'aiTrustLevel',
                            'aiFindSuspect',
                            'aiFindMastermind',
                            'aiDrawPlan',
                            'aiSupportTask',
                          ],
                          values,
                        })
                      ) {
                        setPageIndex(() => pageIndex + 1)
                        scrollToTop()
                      }
                    }}
                  >
                    下一頁
                  </Button>
                </StyledNextPageContainer>
                <Button
                  onClick={() => {
                    setPageIndex(() => pageIndex - 1)
                    scrollToTop()
                  }}
                >
                  回到上一頁
                </Button>
              </StyledButtonsContainer>
            </StyledBox>
          )}
          {pageIndex === 3 && (
            <StyledBox>
              <StyledPageTitle>您的聯絡資訊</StyledPageTitle>
              <StyledPageSubtitle>
                請填入您的 Email 並且按下送出，我們將會將報酬相關資訊寄到您的 Email。
              </StyledPageSubtitle>
              <StyledFormContentContainer>
                <FormControl title="請輸入您的 Email">
                  <Input name="email" value={values.email} onChange={handleChange} width="20rem" />
                </FormControl>
              </StyledFormContentContainer>
              <StyledButtonsContainer>
                <StyledNextPageContainer>
                  <StyledError>
                    {onClickButtonIndex === 3 &&
                      isThisPageError({
                        thisPageFieldNames: ['email'],
                        values,
                      }) &&
                      '請填寫完 Email 再按送出'}
                  </StyledError>
                  <Button
                    type="submit"
                    onClick={() => {
                      setOnClickButtonIndex(3)
                      if (
                        !isThisPageError({
                          thisPageFieldNames: ['email'],
                          values,
                        })
                      ) {
                        submitForm()
                        setPageIndex(() => pageIndex + 1)
                        scrollToTop()
                      }
                    }}
                  >
                    送出
                  </Button>
                </StyledNextPageContainer>
                <Button
                  onClick={() => {
                    setPageIndex(() => pageIndex - 1)
                    scrollToTop()
                  }}
                >
                  回到上一頁
                </Button>
              </StyledButtonsContainer>
            </StyledBox>
          )}
          {pageIndex === 4 && (
            <StyledBox>
              <StyledPageTitle>送出成功！</StyledPageTitle>
              <StyledPageSubtitle>我們將會在幾天內寄送信件，再請您查收，感謝您對本遊戲的支持！</StyledPageSubtitle>
              <StyledImageContainer>
                <img src={Complete} style={{ height: 300, width: 250 }} alt="complete" />
              </StyledImageContainer>
            </StyledBox>
          )}
        </StyledContainer>
      )}
    </Formik>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`
const StyledBox = styled.div`
  width: 60%;
  padding: 1.5rem 3rem;
  border: 1px solid ${color.primaryColor500};
`
const StyledPageTitle = styled.h1`
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0;
`
const StyledPageSubtitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
`
const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  width: 100%;
`
const StyledNextPageContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`
const StyledError = styled.p`
  font-size: 0.875rem;
  color: red;
`
const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledFormContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 1.5rem 0 2rem 0;
`
const StyledFormSubtitle = styled.p`
  margin: 0.25rem 0;
`
