import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"

const ShowBook = () => {
  const [book, setBook] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  useEffect(() => {
    setLoading(true)

    axios
      .get(`http://localhost:5151/book/${id}`)
      .then((res) => {
        setBook(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.log('Error: ', err)
        setLoading(false)
      }) 
  }, [])

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
    </div>>
  )
}

export default ShowBook