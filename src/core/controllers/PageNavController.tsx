import {
  faBook,
  faComment,
  faMarker,
  faPhotoVideo,
} from '@fortawesome/free-solid-svg-icons'
import { useClient } from 'core/hooks/useUser'
import useNavigation from '@mtyk/frontend/core/hooks/useNavigation'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'

export default makeController(function PageNavController() {
  const [user] = useClient()
  const items = [
    {
      label: 'Today',
      icon: faMarker,
      href: '/',
    },
    ...(user.chatEnabled
      ? [
          {
            label: 'Chat',
            icon: faComment,
            href: '/chat',
          },
        ]
      : []),
    {
      label: 'Journal',
      icon: faBook,
      href: '/entries',
    },
    {
      label: 'Resources',
      icon: faPhotoVideo,
      href: '/resources',
    },
  ]

  const navigation = useNavigation(items)
  return { items, navigation }
})
