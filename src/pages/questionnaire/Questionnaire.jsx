import { useState } from 'react'
import styled from '@emotion/styled'
import { FormControlLabel, RadioGroup } from '@mui/material'

import { color } from '../../styles'
import { Button, FormControl, Radio, Input } from '../../components'
import Start from '../../assets/start.svg'
import Complete from '../../assets/complete.svg'

export const Questionnaire = () => {
  const [pageIndex, setPageIndex] = useState(0)

  return (
    <StyledContainer>
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
            <Button onClick={() => setPageIndex(() => pageIndex + 1)}>開始填答</Button>
          </StyledButtonsContainer>
        </StyledBox>
      )}
      {pageIndex === 1 && (
        <StyledBox>
          <StyledPageTitle>您的基本資料</StyledPageTitle>
          <StyledFormContentContainer>
            <FormControl title="請問您的性別是">
              <RadioGroup row>
                <FormControlLabel value="male" label="男性" control={<Radio />} />
                <FormControlLabel value="female" label="女性" control={<Radio />} />
                <FormControlLabel value="other" label="其他" control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <FormControl title="請輸入您的年齡">
              <Input />
            </FormControl>
            <FormControl title="請問您的教育程度是">
              <RadioGroup row>
                <FormControlLabel value="JUNIOR_HIGH" label="國中" control={<Radio />} />
                <FormControlLabel value="SENIOR_HIGH" label="高中" control={<Radio />} />
                <FormControlLabel value="BACHELOR" label="大學" control={<Radio />} />
                <FormControlLabel value="MASTER" label="碩士" control={<Radio />} />
                <FormControlLabel value="DOCTERAL" label="博士" control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <FormControl title="請問以收入而言，您個人（單身）或是家戶（已婚）的經濟狀況在全國排名中，您覺得會落在哪個區間？">
              <RadioGroup row>
                <FormControlLabel value="0.2" label="最低的 20%" control={<Radio />} />
                <FormControlLabel value="0.4" label="20% 至 40%" control={<Radio />} />
                <FormControlLabel value="0.6" label="40% 至 60%" control={<Radio />} />
                <FormControlLabel value="0.8" label="60% 至 80%" control={<Radio />} />
                <FormControlLabel value="1" label="最高的 20%" control={<Radio />} />
              </RadioGroup>
            </FormControl>
            <FormControl title="請問以受人尊重的程度而言，您從事的職業，在所有職業的社會地位排名中，您覺得大概會落在哪個區間？">
              <RadioGroup row>
                <FormControlLabel value="0.2" label="最低的 20%" control={<Radio />} />
                <FormControlLabel value="0.4" label="20% 至 40%" control={<Radio />} />
                <FormControlLabel value="0.6" label="40% 至 60%" control={<Radio />} />
                <FormControlLabel value="0.8" label="60% 至 80%" control={<Radio />} />
                <FormControlLabel value="1" label="最高的 20%" control={<Radio />} />
              </RadioGroup>
            </FormControl>
          </StyledFormContentContainer>
          <StyledButtonsContainer>
            <Button onClick={() => setPageIndex(() => pageIndex + 1)}>下一頁</Button>
            <Button onClick={() => setPageIndex(() => pageIndex - 1)}>回到上一頁</Button>
          </StyledButtonsContainer>
        </StyledBox>
      )}
      {pageIndex === 2 && (
        <StyledBox>
          <StyledPageTitle>您對 AI 的看法</StyledPageTitle>
          <StyledButtonsContainer>
            <Button onClick={() => setPageIndex(() => pageIndex + 1)}>完成填答</Button>
            <Button onClick={() => setPageIndex(() => pageIndex - 1)}>回到上一頁</Button>
          </StyledButtonsContainer>
        </StyledBox>
      )}
      {pageIndex === 3 && (
        <StyledBox>
          <StyledPageTitle>您的聯絡資訊</StyledPageTitle>
          <StyledPageSubtitle>請填入您的 Email 並且按下送出，我們將會將報酬相關資訊寄到您的 Email。</StyledPageSubtitle>
          <StyledButtonsContainer>
            <Button onClick={() => setPageIndex(() => pageIndex + 1)}>送出</Button>
            <Button onClick={() => setPageIndex(() => pageIndex - 1)}>回到上一頁</Button>
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
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  height: calc(100vh - 4rem);
`
const StyledBox = styled.div`
  position: relative;
  width: 60%;
  padding: 1.5rem 3rem;
  border: 1px solid ${color.primaryColor500};
  min-height: 30rem;
  padding-bottom: 2rem;
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
  position: absolute;
  bottom: 2rem;
  width: calc(100% - 6rem);
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
  margin: 1.5rem 0 4rem 0;
`
