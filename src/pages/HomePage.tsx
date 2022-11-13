import React, { useState, useEffect } from 'react'
import RepoCard from '../components/RepoCard'
import { useDebounce } from '../hooks/debounce'
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from '../store/github/github.api'

function HomePage() {
  const [search, setSearch] = useState('')
  const [dropdown, setDropdown] = useState(false)
  const debounced = useDebounce(search)
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery()
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  })

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {
    fetchRepos(username)
    setDropdown(false)
  }

  return (
    <div className="flex justify-center pt-10 mx-auto">
      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Поиск пользователей github..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        {isError && (
          <p className="text-center text-red-600 font-bold">
            Что-то пошло не так...
          </p>
        )}
        {dropdown && (
          <ul className="list-none absolute top-[42px] left-0 right-0 max-h-[200px] overflow-y-scroll shadow-md bg-white">
            {isLoading && <p className="text-center">Загрузка...</p>}
            {data?.map((user) => (
              <li
                onClick={() => clickHandler(user.login)}
                key={user.id}
                className="py-2 px-4 hover:bg-gray-900 hover:text-white transition-color cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        )}
        <div className="container">
          {areReposLoading && (
            <p className="text-center">Список репозиториев загружается...</p>
          )}
          {repos?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage
