import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import  { MdOutlineAddBox } from 'react-icons/md'
import axios from 'axios'
import { useState, useEffect } from "react"
import BooksCard from "../components/home/BooksCard"
import BooksTable from "../components/home/BooksTable"

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('table')

  useEffect(() => {
    setLoading(true)

    axios
      .get('http://localhost:5151/book')
      .then((response) => {
          setBooks(response.data.data)
          setLoading(false)
      })
      .catch(err => {
        console.log(err)
      })

  }, [])

  return (
    <div className="container p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to='/book/create'>
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {
        loading ? (
          <Spinner />
        ) : (
          <BooksTable books={books} />
        )
      }
    </div>
  )
}

export default Home