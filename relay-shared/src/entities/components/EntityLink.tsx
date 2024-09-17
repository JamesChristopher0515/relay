import { Txt } from '@mtyk/frontend/core/components'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import { Id } from '../../RelayTypes'
import useEntityInfo, { ClientEntityStr } from '../helpers/useEntityInfo'

export default function EntityLink({
  type,
  colorize,
  id,
  noLink,
  children,
  style,
  name: _name,
  ...rest
}: {
  type: ClientEntityStr
  colorize?: boolean
  children?: ReactNode
  noLink?: boolean
  name?: string
  style?: React.CSSProperties
  id: Id
}) {
  const info = useEntityInfo(type, id)

  const { data } = info.hook?.(id) ?? { data: undefined }
  if (!info) {
    return <Txt>Unsupported entity</Txt>
  }

  const name = _name ?? (data ? info.getShortName?.(data) ?? data.name : '')
  if (info.url && !noLink) {
    const url =
      typeof info.url === 'string'
        ? `${info.url}/${id}`
        : data
        ? info.url(data)
        : ''
    return (
      <Link href={url}>
        <a
          {...rest}
          css={`
            color: ${colorize ? '#74b6f2' : 'inherit'};
            cursor: pointer;
            font-weight: 500;
            &:hover {
              text-decoration: underline;
            }
          `}
          style={{ ...style }}>
          {children ?? name}
        </a>
      </Link>
    )
  } else {
    return (
      <Txt
        css={`
          color: ${colorize ? '#74b6f2' : 'inherit'};
          cursor: pointer;
          font-weight: 500;
        `}
        style={{ ...style }}>
        {name}
      </Txt>
    )
  }
}

EntityLink.supportedEntities = [
  'questionnaire',
  'questionnaire-result',
  'todo',
  'content',
  'client',
  'journey',
]
