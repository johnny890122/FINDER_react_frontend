import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'

import { API_ROOT, postHeaders } from '../../api.config'
import { getViewport } from '../../utils'
import { Button, Checkbox, CheckboxLevels } from '../../components'
import { color } from '../../styles'
import { selectToolsAvailable, updateGraphRanking } from '../game/game.slice'

import { TourLayout } from './TourLayout'
import { ForceGraph } from '../game/ForceGraph'

const AccordionSummaryWithCheckbox = ({ title, expanded, checked }) => (
  <StyledAccordionSummary>
    <Checkbox level={expanded ? CheckboxLevels.SECONDARY : CheckboxLevels.PRIMARY} checked={checked} />
    {title}
  </StyledAccordionSummary>
)
AccordionSummaryWithCheckbox.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
}
const StyledAccordionSummary = styled(AccordionSummary)`
  & .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
  }
`

export const TourTools = () => {
  const dispatch = useDispatch()
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2

  const toolsAvailable = useSelector(selectToolsAvailable)
  const [expandedTool, setExpandedTool] = useState(toolsAvailable.HDA)
  const [checkedTools, setCheckedTools] = useState([])

  const { data: graphData, isLoading: isGraphDataLoading } = useQuery({
    queryKey: ['gameStart'],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const gameId = localStorage.getItem('gameId')
      const response = await fetch(
        `${API_ROOT}/game_start/?chosen_network_id=0&player_id=${playerId}&session_id=${gameId}`,
        {
          method: 'GET',
        },
      )
      if (!response.ok) {
        throw new Error('Failed to start a game')
      }
      return response.json()
    },
  })

  const { isLoading: isNodeRankingLoading } = useQuery({
    enabled: !!expandedTool,
    queryKey: ['nodeRanking', expandedTool],
    queryFn: async () => {
      const playerId = localStorage.getItem('playerId')
      const response = await fetch(`${API_ROOT}/node_ranking/`, {
        ...postHeaders,
        method: 'POST',
        body: JSON.stringify({
          chosen_network_id: '0',
          chosen_tool_id: expandedTool.code.toString(),
          player_id: playerId,
          round_id: 0,
          graphData,
        }),
      })
      if (!response.ok) {
        throw new Error('Failed to get node ranking')
      }

      return response.json()
    },
    onSuccess: nodeRanking => {
      dispatch(updateGraphRanking(nodeRanking))
    },
  })

  return (
    <TourLayout pageTitle="輔助工具">
      <StyledContainer>
        <StyledParagraph>
          為了增進您破解網絡的績效，與其用肉眼判斷該移除哪一個點，您也可以參考一些學界所發展的量化指標。
          <br />
          我們提供了幾種指標供您參考，請依序點選以下指標查看他們的定義。
          <br />
          同時您也可以注意到，右側網絡上的各點都依據您選擇的指標改變大小了，將滑鼠靠近他們，可以看到該點依據指標計算出的排名。
          <br />
          當您查看完所有指標的定義，就可以按下一步查看進階說明了！
        </StyledParagraph>
        <StyledOptionsContainer>
          {Object.values(toolsAvailable)
            .filter(tool => tool?.displayName !== '自行判斷')
            .map(tool => {
              const expanded = (expandedTool?.code ?? '') === tool.code
              return (
                <StyledOptionContainer key={tool.code}>
                  <StyledAccordion
                    expanded={expanded}
                    onChange={() => {
                      setExpandedTool(tool)
                      if (!checkedTools.includes(tool.code))
                        setCheckedTools(preCheckedTools => [...preCheckedTools, tool.code])
                    }}
                  >
                    <AccordionSummaryWithCheckbox
                      title={tool.displayName}
                      expanded={expanded}
                      checked={checkedTools.includes(tool.code)}
                    />
                    <StyledAccordionDetails>{tool.introduction}</StyledAccordionDetails>
                  </StyledAccordion>
                </StyledOptionContainer>
              )
            })}
        </StyledOptionsContainer>
        <StyledLink to="/tour/actions">
          <Button width="10rem" disabled={checkedTools.length !== Object.keys(toolsAvailable).length}>
            下一步
          </Button>
        </StyledLink>
      </StyledContainer>
      <div>
        {graphData && (
          <ForceGraph
            withAction={false}
            withPayoff={false}
            loading={isGraphDataLoading || isNodeRankingLoading}
            graphData={graphData}
            selectedTool={expandedTool}
            width={graphWidth}
            height={graphHeight}
          />
        )}
      </div>
    </TourLayout>
  )
}

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
`
const StyledParagraph = styled.div`
  margin-top: 1rem;
`
const StyledLink = styled(Link)`
  position: absolute;
  right: 1rem;
  bottom: 0;
  text-decoration: none;
  color: inherit;
  @media screen and (max-width: 767px) {
    position: static;
    margin: 1rem 0;
  }
`
const StyledOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-top: 1rem;
  width: 100%;
  @media screen and (max-width: 767px) {
    margin-bottom: 1rem;
  }
`
const StyledOptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const StyledAccordion = styled(Accordion)`
  background-color: ${props => props.expanded && color.primaryColor400};
  color: ${props => props.expanded && color.neutralsColor0};
  & .MuiAccordionSummary-root {
    min-height: 3rem;
  }
  & .MuiAccordionSummary-content {
    margin: 0.75rem 0;
  }
`
const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
`
