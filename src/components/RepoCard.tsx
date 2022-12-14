import React, { useState } from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'
import { IRepo } from '../models/model'

function RepoCard({ repo }: { repo: IRepo }) {
  const { addFavourite, removeFavourite } = useActions()
  const { favourites } = useAppSelector((state) => state.github)
  const [isFav, setIsFav] = useState(favourites.includes(repo.html_url))

  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    addFavourite(repo.html_url)
    setIsFav(true)
  }

  const removeFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    removeFavourite(repo.html_url)
    setIsFav(false)
  }

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Сейчас смотрят: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {!isFav && (
          <button
            className="mt-2 py-2 px-4 mr-2 bg-green-500 rounded hover:shadow-md text-white transition-all"
            onClick={addToFavourite}
          >
            Сохранить
          </button>
        )}

        {isFav && (
          <button
            className="mt-2 py-2 px-4 bg-red-500 rounded hover:shadow-md text-white transition-all"
            onClick={removeFromFavourite}
          >
            Удалить
          </button>
        )}
      </a>
    </div>
  )
}

export default RepoCard
