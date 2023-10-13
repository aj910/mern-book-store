import React, { useState, useEffect } from "react"
import Spinner from "../components/Spinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
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
        <>
        <header className="bg-sky-600">
      <nav className="flex max-w-7xl items-center justify-between p-5 lg:px-5" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
          </a>
        </div>
      </nav>
    </header>
            <div className="p-4">
                <div className="flex justify-center items-center gap-x-4">
                    <button className="bg-sky-5s00 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setViewType('table')}>Table</button>
                    <button className="bg-sky-500 hover:bg-sky-600 px-4 py-1 rounded-lg" onClick={() => setViewType('card')}>Card</button>
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
        </>
    );
};

export default Home;