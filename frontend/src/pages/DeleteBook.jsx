import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack'

const DeleteBook = () => {
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar()

  const handleDeleteBook = () => {
    setLoading(true);

    axios
      .delete(`https://book-crud-gd0a.onrender.com/book/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Deleted Successfully', { variant: 'success' })
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' })
        console.log(err);
      });
  };

  return (
    <div className="py-4">
      <BackButton dest="/" />
      
      {loading ? <Spinner /> : (
      <div className="flex flex-col items-center font-rubik bg-white border-1 shadow rounded-xl sm:w-10/12 md:w-5/12 p-8 mx-auto">
        <h1 className="text-3xl my-8 text-center font-rubik">Delete Book</h1>
        <h3 className="text-2xl font-rubik italic">Are you sure to delete this book?</h3>

        <button
          className="py-2 px-4 text-white mx-auto shadow bg-red-600 hover:bg-white hover:text-red-600 w-fit rounded-md m-8"
          onClick={handleDeleteBook}
        >
          Delete
        </button>
      </div>)}
    </div>
  );
};

export default DeleteBook;
