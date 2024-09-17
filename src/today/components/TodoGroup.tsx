import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { Todo } from 'relay-shared/RelayTypes'
import { infoForGroup } from './infoForGroup'
import { nameForType } from './nameForType'
import TodoGroupBox from './TodoGroupBox'
import { TodoRow } from './TodoRow'

export function TodoGroup({
  items,
  group,
}: {
  items: Todo[]
  group?: 'questionnaire' | 'content' | 'generic' | 'check-in' | 'video-call'
}) {
  const groupInfo = group
    ? infoForGroup(group as any)
    : {
        icon: undefined,
        iconColor: '#888',
        color: '#888',
      }

  // return null
  return (
    <TodoGroupBox>
      <Flex
        columnCenter
        justifyContent="flex-start"
        padding={[0, 0]}
        gap={2}
        style={{
          width: 64,
          paddingLeft: 5,
          paddingTop: group === 'check-in' ? 15 : 12,
        }}
      >
        {groupInfo.icon ? (
          <Icon
            icon={groupInfo.icon}
            size={group === 'check-in' ? 24 : 19}
            color={groupInfo.iconColor}
          />
        ) : null}
        {group !== 'check-in' ? (
          <Txt color={groupInfo.color} medium size={12}>
            {nameForType(group)}
          </Txt>
        ) : null}
      </Flex>
      <Flex
        style={{
          paddingRight: 18,
          paddingLeft: 8,
          paddingVertical: 15,
        }}
        shrink
        grow
        gap={10}
      >
        {items.map((item, index) => (
          <Flex>
            <TodoRow
              key={item._id}
              index={index}
              groupInfo={groupInfo}
              item={item}
            />
          </Flex>
        ))}
      </Flex>
    </TodoGroupBox>
  )
}
