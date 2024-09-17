import { Flex, Txt } from '@mtyk/frontend/core/components'
import { borderBottom } from '@mtyk/frontend/styles/helpers/styles'
import React, { useMemo } from 'react'
import useRecentContent from 'resources/hooks/useRecentContent'
import ResourceItemRow from './ResourceItemRow'

export default function ResourcesRecent() {
  const { data: _recent } = useRecentContent()
  // Keep order the same so it doesn't re-shuffle as we open each
  const recent = useMemo(() => _recent, [_recent.length])

  if (recent.length > 0) {
    return (
      <Flex
        style={{
          // marginHorizontal: 20,
          marginBottom: 30,
        }}
      >
        <Txt bold color={'#796D6D'} size={15}>
          Recently Viewed
        </Txt>
        <Flex
          style={{
            borderRadius: 20,
            backgroundColor: 'white',
            marginTop: 12,
            maxWidth: 280,
          }}
        >
          {recent.slice(0, 2).map((clientContent, i) => {
            return (
              <ResourceItemRow
                appearance="recent"
                clientContent={clientContent}
                key={clientContent._id}
                textProps={{
                  bold: true,
                  size: 14,
                  numberOfLines: 2,
                  style: {
                    color: '#7E8076',
                  },
                }}
                style={{
                  ...(i === 0 ? borderBottom(1, '#EDEDED') : {}),
                  paddingVeritcal: 2,
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                }}
              />
            )
          })}
        </Flex>
      </Flex>
    )
  } else {
    return null
  }
}
