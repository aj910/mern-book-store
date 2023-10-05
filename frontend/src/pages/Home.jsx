import React, {useState, useEffect} from "react"
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit} from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BookTable from "../components/layout/BookTable";
import BookCard from "../components/layout/BookCard";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [viewType, setViewType] = useState('table');
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
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setViewType('table')}>Table</button>
                <button className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setViewType('card')}>Card</button>
            </div>
            <div className="flex justify-center items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create">
                    <MdOutlineAddBox className="text-sky-700 ml-1 mt-1 text-4xl" />
                </Link>
            </div>
            {isloading ? (
                <Spinner />
               ) : viewType === 'table' ? (
                <BookTable books={books} />
               ) : (
                <BookCard books={books} />
               )}
        </div>
    );
};

export default Home;