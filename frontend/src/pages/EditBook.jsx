import { useEffect, useState } from "react"
import axios from 'axios';
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [publishYear, setPublishYear] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)

    axios
      .get(`https://book-crud-gd0a.onrender.com/book/${id}`)
      .then((res) => {
        setAuthor(res.data.author)
        setPublishYear(res.data.publishYear)
        setTitle(res.data.title)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }, [])

  const handleEditData = () => {
   const data = {
    title,
    author,
    publishYear
   }

   setLoading(true)

   axios
    .put(`http://localhost:5151/book/${id}`, data)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((err) => {
      setLoading(false)
      alert('Error occurred')
      console.log(err)
    })
  }

  return (
    <div className="my-4">
      <BackButton dest='/' />
      {loading ? <Spinner /> : (
      <div className="flex flex-col font-rubik bg-white border-1 shadow rounded-xl rounded-xl sm:w-10/12 md:w-5/12 p-4 mx-auto"> 
        <h1 className="text-3xl text-center font-rubik">Edit Book</h1>
        <div className="my-4">
          <label className="text-xl mr-4">Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-600 border border-gray-400 px-2 py-1 rounded-md w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4">Author</label>
          <input 
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="text-gray-600 border border-gray-400 px-2 py-1 rounded-md w-full"
          />
        </div>
       
        <div className="my-4">
          <label className="text-xl mr-4">Publish Year</label>
          <input 
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="text-gray-600 border border-gray-400 px-2 py-1 rounded-md w-full"
          />
        </div>
      
      <button  className="py-2 px-4 text-white mx-auto shadow bg-emerald-600 hover:bg-white hover:text-green-600 w-fit rounded-md m-8" onClick={handleEditData}>
        Save
      </button>
      </div> )}
    </div>
  )
}

export default EditBook