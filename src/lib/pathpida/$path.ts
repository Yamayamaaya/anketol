export const pagesPath = {
  "mypage": {
    $url: (url?: { hash?: string }) => ({ pathname: '/mypage' as const, hash: url?.hash })
  },
  "questionnaire": {
    $url: (url?: { hash?: string }) => ({ pathname: '/questionnaire' as const, hash: url?.hash })
  },
  "signin": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signin' as const, hash: url?.hash })
  },
  "signup": {
    $url: (url?: { hash?: string }) => ({ pathname: '/signup' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
