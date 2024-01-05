export const pagesPath = {
  "doc": {
    "PrivacyPolicy": {
      $url: (url?: { hash?: string }) => ({ pathname: '/doc/PrivacyPolicy' as const, hash: url?.hash })
    },
    "SetUpAndHelp": {
      $url: (url?: { hash?: string }) => ({ pathname: '/doc/SetUpAndHelp' as const, hash: url?.hash })
    },
    "TermsOfUse": {
      $url: (url?: { hash?: string }) => ({ pathname: '/doc/TermsOfUse' as const, hash: url?.hash })
    }
  },
  "mypage": {
    $url: (url?: { hash?: string }) => ({ pathname: '/mypage' as const, hash: url?.hash })
  },
  "questionnaire": {
    "edit": {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/questionnaire/edit/[id]' as const, query: { id }, hash: url?.hash })
      })
    },
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
