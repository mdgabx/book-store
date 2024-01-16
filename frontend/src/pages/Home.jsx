import { Link } from "react-router-dom"
import Spinner from "../components/Spinner"
import { IoAdd } from "react-icons/io5";
import axios from 'axios'
import { useState, useEffect } from "react"
import BooksCard from "../components/home/BooksCard"
import BooksTable from "../components/home/BooksTable"
import { CiViewTable } from "react-icons/ci";
import { LiaGripVerticalSolid } from "react-icons/lia";

const Home = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showType, setShowType] = useState('table')

  useEffect(() => {
    setLoading(true)

    axios
      .get('https://book-crud-gd0a.onrender.com/book')
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
      <div className="flex justify-center items-center gap-x-2">
        <button
          className="bg-white hover:bg-sky-600 hover:text-white px-2 py-1 border shadow"
          onClick={() => setShowType('table')}
        >
          <CiViewTable size={30} />
        </button>
        <button
          className="bg-white hover:bg-sky-600 hover:text-white px-2 py-1 border shadow"
          onClick={() => setShowType('card')}
        >
          <LiaGripVerticalSolid size={30} />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl my-8 font-rubik">Books List</h1>
        <Link to='/book/create' className="bg-white">
          <IoAdd size={30} className="shadow hover:text-white hover:bg-sky-600" />
        </Link>
      </div>
      {
        loading ? 
          <Spinner />
         : 
          showType === 'table' ? 
          <BooksTable books={books} />
         : 
          <BooksCard books={books} />
      }
    </div>
  )
}

export default Home