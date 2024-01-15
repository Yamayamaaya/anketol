import { Avatar, Divider } from '@chakra-ui/react'
import {
  faFile,
  faSquareCheck,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { User } from '@src/types/user'
import { useRouter } from 'next/router'

type ProfileCardProps = {
  user?: User
  display: 'profile' | 'posted' | 'answered'
}

export const ProfileCard = ({ user, display }: ProfileCardProps) => {
  const router = useRouter()
  return (
    <div className="w-1/4 flex hidden md:block">
      <div className="w-4/5 mx-auto  flex min-w-[180px] h-max flex-col items-center justify-center shadow-lg gap-2 mt-12 rounded-md">
        <Avatar
          flexShrink={0}
          width={10}
          height={10}
          src={user?.photoURL || 'default_image_url'}
        />
        <p>{user?.displayName}</p>
        <Divider />
        <div className="flex flex-col items-start justify-center gap-2 my-4">
          <button
            className={` flex items-center gap-1.5 ${
              display === 'profile' ? 'text-black' : 'text-gray-500'
            }`}
            onClick={() => router.push('/mypage/profile')}
          >
            <FontAwesomeIcon icon={faUser} size="xs" className="h-3 w-3" />
            <span>プロフィール</span>
          </button>
          <button
            className={` flex items-center gap-1.5
              ${display === 'posted' ? 'text-black' : 'text-gray-700'}
            `}
            onClick={() => router.push('/mypage/posted')}
          >
            <FontAwesomeIcon icon={faFile} size="xs" className="h-3 w-3" />
            <span>投稿済みアンケート</span>
          </button>
          <button
            className={` flex items-center gap-1.5
              ${display === 'answered' ? 'text-black' : 'text-gray-700'}
            `}
            onClick={() => router.push('/mypage/answered')}
          >
            <FontAwesomeIcon
              icon={faSquareCheck}
              size="xs"
              className="h-3 w-3"
            />
            <span>回答済みアンケート</span>
          </button>
        </div>
      </div>
    </div>
  )
}
