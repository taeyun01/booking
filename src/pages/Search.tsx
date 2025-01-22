import useDebounce from '@/components/shared/hocs/useDebounce'
import Input from '@/components/shared/Input'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { getSearchCards } from '@/remote/hotel'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import {
  ChangeEvent,
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useQuery } from 'react-query'
import { useNavigate, useLocation } from 'react-router-dom'

const SearchPage = () => {
  const location = useLocation()
  const isSearchPage = ['/search'].includes(location.pathname) === true
  console.log(isSearchPage)

  const [keyword, setKeyword] = useState('')
  const debouncedKeyword = useDebounce(keyword, 600)

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const { data } = useQuery({
    queryKey: ['search', debouncedKeyword],
    queryFn: () => getSearchCards(debouncedKeyword),
    enabled: debouncedKeyword !== '', // 검색을 입력했을 때만 쿼리 실행
  })

  useEffect(() => {
    const currentInputRef = inputRef.current

    if (currentInputRef) {
      currentInputRef.focus()
    }

    const handleBlur = () => {
      if (isSearchPage) {
        window.history.back()
      }
    }

    currentInputRef?.addEventListener('blur', handleBlur)

    return () => {
      currentInputRef?.removeEventListener('blur', handleBlur)
    }
  }, [isSearchPage])

  // console.log(data)

  const handleKeyword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])
  return (
    <ContainerStyles>
      <div style={{ padding: '24px 24px 12px 24px' }}>
        <Input
          ref={inputRef}
          value={keyword}
          placeholder="찾으시는 호텔이 있으신가요?"
          onChange={handleKeyword}
        />

        {keyword !== '' && data?.length === 0 ? (
          <SearchEmptyStyled>
            <Text bold typography="t6">
              찾으시는 호텔이 없습니다
            </Text>
          </SearchEmptyStyled>
        ) : (
          <ul>
            {data?.map((hotel, idx) => (
              <Fragment key={hotel.id}>
                <ListRow
                  style={searchBox}
                  left={
                    <Text bold typography="t6">
                      {idx + 1}
                    </Text>
                  }
                  contents={
                    <ListRow.ListRowTexts title={hotel.name} subTitle="" />
                  }
                  withArrow
                  onClick={() => navigate(`/hotel/${hotel.id}`)}
                />
                <Spacing size={1} backgroundColor="gray100" />
              </Fragment>
            ))}
          </ul>
        )}
      </div>
    </ContainerStyles>
  )
}

const ContainerStyles = styled.div`
  background-color: white;
  // height: 100%;
  min-height: 100dvh;
  max-height: 100%;
`

const SearchEmptyStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 0;
`

const searchBox = css`
  padding: 22px 12px;
  cursor: pointer;
`

export default SearchPage
