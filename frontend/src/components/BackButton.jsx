import { TiArrowBack } from "react-icons/ti";
import { Link } from 'react-router-dom'

const BackButton = ({dest}) => {

  return (
    <div className="flex">
        <Link to={dest}
        className='mt-2 mx-4 bg-green-600 hover:bg-white hover:text-green-600 shadow text-white px-4 py-1 rounded-lg w-fit'
        >
            <TiArrowBack size={30} />
        </Link>
    </div>
  )
}


export default BackButton