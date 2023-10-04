import React, {useState, useEffect} from "react"
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit} from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md"

const Home = () => {
    const [books, setBooks] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios.get('http://localhost:5555/books').then((response) => {
            setBooks(response.data.data);
            setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }, [])
    return (
        <div className="p-4">
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">Table</button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg">Card</button>
            </div>
            <div className="flex justify-center items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-700 ml-1 mt-1 text-4xl" />
                </Link>
            </div>
            {isloading ? (
                <Spinner />
            ) : (
                <table className="w-full border-seperate border-spacing-2">
                   <thead>
                    <tr>
                        <th className="border border-slate-600 rounded-md">No</th>
                        <th className="border border-slate-600 rounded-md">Title</th>
                        <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                        <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                        <th className="border border-slate-600 rounded-md">Actions</th>
                    </tr>
                   </thead>
                   <tbody>
                    {books.map((book, index) => (
                        <tr key={book._id} className="h-8">
                            <td className="border border-slate-700 rounded-md text-center">
                                {index + 1}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {book.title}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {book.author}
                            </td>
                            <td className="border border-slate-700 rounded-md text-center">
                                {book.publishYear}
                            </td>
                            <td className="border border-slate-700 rounded-md-text-center">
                               <div className="flex justify-center gap-x-4">
                                <Link to={`/books/details/${book._id}`}>
                                    <BsInfoCircle className="text-2xl text-green-800" />
                                </Link>
                                <Link to={`books/edit/${book._id}`}>
                                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                                </Link>
                                <Link to={`books/delete/${book._id}`}>
                                    <MdOutlineDelete className="text-2xl text-red-600" />
                                </Link>
                               </div>
                            </td>
                        </tr>
                    ))}
                   </tbody>
                </table>
            )}
        </div>
    )
}

export default Home;