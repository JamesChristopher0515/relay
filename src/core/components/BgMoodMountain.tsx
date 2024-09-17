import { useClient } from 'core/hooks/useUser'
import { scaleLinear } from 'd3'
import { area, curveNatural, line } from 'd3-shape'
import { add } from 'date-fns'
import { flatMap } from 'lodash'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Path, Svg } from 'react-native-svg'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import { getFeelingByName } from 'relay-shared/feelings/helpers/getAllFeelings'
import { useGetCheckInsQuery } from 'relay-shared/frontend/api/hooks/useApi'

export interface BGMoodMountainProps {}

export default function BGMoodMountain(props: BGMoodMountainProps) {
  const dimensions = useDimensions()
  const config = {
    margin: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    height: dimensions.height * 2,
  }
  const { height } = config
  const [client] = useClient()
  const startDate = useMemo(
    () =>
      add(new Date(), {
        days: -60,
      }),
    []
  )
  const endDate = useMemo(() => new Date(), [])

  const { data: checkIns } = wrapArrayHook(
    useGetCheckInsQuery(
      {
        client: client?._id,
        createdAt: { $gte: startDate.toISOString() },
      },
      { skip: !client }
    )
  )

  if (!client) {
    return null
  }

  const mountainInitial = [-5, -6, -5, -2, 0, 0.2, 0.6, 0.2, 0.1].map(
    (valence, index) => {
      return {
        index: index,
        valence: valence,
      }
    }
  )

  const feelingsFromCheckIn = flatMap(
    checkIns.sort((c, b) => c.createdAt.getTime() - b.createdAt.getTime()),
    (c) => c.feelings
  ).map((feeling, index) => {
    return {
      valence: getFeelingByName(feeling.name)!.valence,
      index: index + mountainInitial.length,
    }
  })

  const feelings = [...mountainInitial, ...feelingsFromCheckIn]

  const pointWidth = 100
  const totalWidth = pointWidth * feelings.length
  const xScale = scaleLinear()
    .domain([0, feelings.length - 1])
    .range([0, totalWidth])
  const yScale = scaleLinear().domain([-2.6, 1.3]).range([config.height, 0])

  const lineMaker = line()
    .x((d) => xScale(d.index))
    .y((d) => yScale(d.valence))
    .curve(curveNatural)

  const areaMarker = area()
    .x((d) => xScale(d.index))
    .y0(config.height)
    .y1((d) => yScale(d.valence))
    .curve(curveNatural)

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: totalWidth,
        // bottom: 0,
        backgroundColor: '#F8F4F4',
      }}
    >
      <Svg
        height={height}
        viewBox={`0 ${config.height - height} ${totalWidth} ${height}`}
        width={totalWidth}
        style={{
          height: height,
          width: totalWidth,
        }}
      >
        <Path
          d={lineMaker(feelings)}
          stroke={'#FFFCFA'}
          strokeWidth={3.5}
          strokeOpacity={1}
          translateX={-190}
          translateY={-55}
        />
        <Path d={areaMarker(feelings)} fill={'#FdF8F8'} />
        <Path
          d={lineMaker(feelings)}
          stroke={'#EDE8E8'}
          strokeWidth={3.5}
          strokeOpacity={0.6}
        />
      </Svg>
    </View>
  )
}
