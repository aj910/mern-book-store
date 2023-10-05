import { Link } from "react-router-dom";
import { PiBookOpen } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfo, BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BookSingleCard = ({book}) => {
    
    return (
        <div className="border-4 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-lg">
           <h2 className="absolute top-2 right-2 px-4 py-1 bg-red-300 rounded-lg">{book.publishYear}</h2>
           <div className="flex justify-start items-center gap-x-2">
             <PiBookOpen className="text-red-300 text-xl" />
             <h2 className="my-1">{book.title}</h2>
           </div>
           <div className="flex justify-start items-center gap-x-2">
             <BiUserCircle className="text-red-300 text-xl" />
             <h2 className="my-1">{book.author}</h2>
           </div>
           <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
            <Link to={`/books/details/${book._id}`}>
                <BsInfoCircle className="text-xl text-green-800 hover:text-black" />
            </Link>
            <Link to={`/books/edit/${book._id}`}>
                <AiOutlineEdit className="text-xl text-yellow-600 hover:text-black" />
            </Link>
            <Link to={`/books/delete/${book._id}`}>
                <MdOutlineDelete className="text-xl text-red-500 hover:text-black" />
            </Link>
           </div>
          
        </div>
    )
}

export default BookSingleCard;