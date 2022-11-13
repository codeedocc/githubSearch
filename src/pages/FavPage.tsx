import React from 'react'
import { useActions } from '../hooks/actions'
import { useAppSelector } from '../hooks/redux'

function FavPage() {
  const { removeFavourite } = useActions()
  const { favourites } = useAppSelector((state) => state.github)

  const removeFromFavourite = (e: any, f: any) => {
    e.preventDefault()

    const shouldRemove = window.confirm('Вы уверены?')
    if (shouldRemove) {
      removeFavourite(f)
    }
  }

  if (favourites.length === 0)
    return <p className="flex justify-center pt-10">В избранном ничего нет.</p>

  return (
    <div className="flex justify-center pt-10 mx-auto">
      <ul className="list-none">
        {favourites?.map((f, index) => (
          <li
            key={f}
            className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all"
          >
            <a href={f} target="_blank">
              <p className="text-sm">
                <span className="font-bold">
                  {index + 1}.&nbsp;{f}
                </span>
              </p>
              <button
                className="mt-2 py-2 px-4 bg-red-500 rounded hover:shadow-md text-white transition-all"
                onClick={(e) => removeFromFavourite(e, f)}
              >
                Удалить
              </button>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FavPage
