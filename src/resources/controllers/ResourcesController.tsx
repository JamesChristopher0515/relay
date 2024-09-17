import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import { useEffect, useState } from 'react'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import useAssignedContent from 'resources/hooks/useAssignedContent'
import useFavouritedContent from 'resources/hooks/useFavouritedContent'
import { useWrappedAxios } from '../../core/hooks/useWrappedAxios'
import { useDebouncedEffect } from '../hooks/useDebouncedEffect'

export default makeController(function ResourcesController() {
  const searchValue = useInputAdapter('')
  const [searchResults, setSearchResults] = useState([])
  const [loadingSearch, setLoadingSearch] = useState(false)
  const tabs = ['Assigned', 'Favourites']

  const { data: assignedContent, isLoading: assignedContentLoading } =
    useAssignedContent()
  const { data: favouritedContent, isLoading: favouritedLoading } =
    useFavouritedContent()
  const axios = useWrappedAxios()
  const eitherLoading = assignedContentLoading || favouritedLoading

  useEffect(() => {
    if (searchValue.value.trim().length) {
      setLoadingSearch(true)
    }
  }, [searchValue.value])
  useDebouncedEffect(
    async () => {
      try {
        const { data: result } = await axios.get(
          `/resources?query=${searchValue.value}`
        )
        console.log(assignedContent)
        const matchingAssigned = assignedContent.filter((resource) => {
          return (
            (resource.content?.name ?? '')
              .toLowerCase()
              .indexOf(searchValue.value.toLowerCase()) >= 0
          )
        })

        setSearchResults([...result, ...matchingAssigned])
      } catch (e) {
        console.error(`Error fetching search results`)
        console.error(e)
      }
      setLoadingSearch(false)
    },
    { timeout: 500 },
    [searchValue.value]
  )

  return {
    searchResults,
    favouritedContent,
    assignedContent,
    isLoading: eitherLoading,
    assignedContentLoading,
    favouritedLoading,
    noResults: searchResults.length === 0,
    hasSearchValue: searchValue.value.trim().length > 0,
    loadingSearch,
    searchValue,
    tabs,
  }
})
