import { createContext, useContext, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { API_ROOT } from './api.config'

const DataContext = createContext()

export const useContextData = () => useContext(DataContext)

export const DataContextProvider = ({ children }) => {
  const gameId = localStorage.getItem('gameId')

  const {
    data: networksAvailable,
    isLoading: isNetworksApiLoading,
    isError: isNetworksApiError,
    refetch: refetchNetworksAvailable,
  } = useQuery({
    queryKey: ['networkAvailable', gameId],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/networks/`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available networks')
      }

      return response.json() ?? {}
    },
  })

  const {
    data: toolsAvailable,
    isLoading: isToolsApiLoading,
    isError: isToolsApiError,
    refetch: refetchToolsAvailable,
  } = useQuery({
    queryKey: ['toolsAvailable', gameId],
    queryFn: async () => {
      const response = await fetch(`${API_ROOT}/tools/`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Failed to fetch available tools')
      }
      return response.json() ?? {}
    },
  })

  const contextValue = useMemo(
    () => ({
      data: { networksAvailable, toolsAvailable },
      loadingStates: { isNetworksApiLoading, isToolsApiLoading },
      errorStates: { isNetworksApiError, isToolsApiError },
      refetch: () => {
        refetchNetworksAvailable()
        refetchToolsAvailable()
      },
    }),
    [networksAvailable, toolsAvailable, isNetworksApiLoading, isToolsApiLoading, isNetworksApiError, isToolsApiError],
  )

  return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
}
DataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
