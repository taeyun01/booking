import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

import { Global } from '@emotion/react'
import globalStyles from './styles/globalStyles.ts'

import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0, // 요청 실패 시 재시도 하지 않음 (실패하게되면 바로 실패하도록 설정)
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={globalStyles} />
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
)
