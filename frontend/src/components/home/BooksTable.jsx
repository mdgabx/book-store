import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import  { MdOutlineDelete } from 'react-icons/md'
import { Link } from "react-router-dom"
import { TbListDetails } from "react-icons/tb";

const BooksTable = ({ books }) => {
  return (
    <table className="w-full border-collapse font-rubik font-xs bg-white shadow">
    <thead>
      <tr className='bg-gray-200'>
        <th className="border border-slate-200 p-2">No</th>
        <th className="border border-slate-200 p-2">Title</th>
        <th className="border border-slate-200 p-2 max-md:hidden">Author</th>
        <th className="border border-slate-200 p-2 max-md:hidden">Publish Year</th>
        <th className="border border-slate-200 p-2">Operations</th>
      </tr>
     
    </thead>
    <tbody>
      { books.map((book, idx) => (
        <tr key={book._id}  className="h-8">
          <td className="border border-slate-200 p-2 rounded-md text-center">
            { idx + 1 }
          </td>
          <td className="border border-slate-200 rounded-md text-center">
            { book.title }
          </td>
          <td className="border border-slate-200 rounded-md text-center max-md:hidden">
            { book.author}
          </td>
          <td className="border border-slate-200 rounded-md text-center max-md:hidden">
            { book.publishYear }
          </td>
          <td className="border border-slate-200 rounded-md text-center">
            <div className="flex items-center justify-center gap-x-2">
              <Link to={`/book/detail/${book._id}`}>
                <TbListDetails className="text-2xl text-emerald-600" />
              </Link>
              <Link to={`/book/edit/${book._id}`}>
                <AiOutlineEdit className="text-2xl text-yellow-600" />
              </Link>
              <Link to={`/book/delete/${book._id}`}>
                <MdOutlineDelete className="text-2xl text-red-800" />
              </Link>
            </div>
          </td>
        </tr>
      ))
      }
    </tbody>
  </table>
  )
}

export default BooksTable