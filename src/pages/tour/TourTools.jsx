import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Accordion, AccordionDetails } from '@mui/material'

import { API_ROOT, postHeaders } from '../../api.config'
import { useContextData } from '../../DataContext'
import { getViewport } from '../../utils'
import { Button, AccordionSummaryWithCheckbox } from '../../components'
import { color } from '../../styles'
import { updateGraphRanking } from '../game/game.slice'
import { getToolImage } from './tour.utils'

import { TourLayout } from './TourLayout'
import { ForceGraph } from '../game/ForceGraph'
import { StyledContainer, StyledParagraph, StyledGraphAndButtonContainer, StyledLink } from './Tour.styles'

const AccordionDetailWithImage = ({ text, image }) => (
  <StyledAccordionDetails>
    {text}
    {image && <img src={image} alt="Tool" width="100%" />}
  </StyledAccordionDetails>
)
AccordionDetailWithImage.propTypes = {
  text: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  image: PropTypes.any,
}
const StyledAccordionDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.75rem;
  margin-left: 0.75rem;
`

export const TourTools = () => {
  const dispatch = useDispatch()
  const { width: viewportWidth, height: viewportHeight } = getViewport()
  const graphWidth = viewportWidth > 768 ? viewportWidth / 2 : viewportWidth - 28
  const graphHeight = viewportWidth > 768 ? viewportHeight - 200 : viewportHeight / 2
  const contextData = useContextData()
  const {
    data: { toolsAvailable = {} },
  } = contextData

  const [expandedTool, setExpandedTool] = useState(toolsAvailable.HDA)
  const [checkedTools, setCheckedTools] = useState([])
  const toolsAvailableWithoutNoHelp = Object.entries(toolsAvailable)
    .filter(([key]) => key !== 'NO_HELP')
    .reduce((acc, current) => {
      const [key, value] = current
      return { ...acc, [key]: value }
    }, {})

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
          為了增進您破解網絡的績效，除了用肉眼判斷該移除哪一個點，您也可以參考以下一些量化指標。
          <br />
          <br />
          請依序點選指標查看他們的定義。同時您可能會注意到，右側網絡上的各點會依據您選擇的指標改變大小，若將滑鼠靠近他們，可以看到該點依據指標計算出的排名。
          <br />
          <br />
          當您查看完所有指標的定義，請按下一步查看進階說明。請勾選指標，來閱讀細節說明。
        </StyledParagraph>
        <StyledOptionsContainer>
          {Object.values(toolsAvailableWithoutNoHelp).map(tool => {
            const expanded = (expandedTool?.code ?? '') === tool.code
            return (
              <StyledOptionContainer key={tool.code}>
                <StyledAccordion
                  expanded={expanded}
                  onChange={(_, isExpanded) => {
                    setExpandedTool(isExpanded ? tool : null)
                    if (!checkedTools.includes(tool.code))
                      setCheckedTools(preCheckedTools => [...preCheckedTools, tool.code])
                  }}
                >
                  <AccordionSummaryWithCheckbox
                    title={tool.displayName}
                    expanded={expanded}
                    checked={checkedTools.includes(tool.code)}
                  />
                  <AccordionDetailWithImage
                    text={tool.introduction}
                    image={getToolImage({ toolName: tool.displayName })}
                  />
                </StyledAccordion>
              </StyledOptionContainer>
            )
          })}
        </StyledOptionsContainer>
        <StyledLink to="/tour/actions">
          <Button width="10rem" disabled={checkedTools.length !== Object.keys(toolsAvailableWithoutNoHelp).length}>
            下一步
          </Button>
        </StyledLink>
      </StyledContainer>
      <StyledGraphAndButtonContainer>
        <ForceGraph
          withAction={false}
          loading={isGraphDataLoading || isNodeRankingLoading}
          graphData={graphData}
          selectedTool={expandedTool}
          width={graphWidth}
          height={graphHeight}
        />
      </StyledGraphAndButtonContainer>
    </TourLayout>
  )
}

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
