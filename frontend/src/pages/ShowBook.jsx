import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:5555/books/${id}`).then((response) => {
            setBook(response.data)
            setIsLoading(false)
        }).catch((error) => {
            console.log(error);
            setIsLoading(false);
        })
    }, [])
    return (
        <div className="m-6">
            <BackButton />
            <h1 className="text-2xl text-center my-4">Show Book</h1>
            {isLoading ? (
                <Spinner />
            ) : (
              <div className="flex flex-col border-2 border-sky-800 rounded-lg w-fit p-6 mx-auto">
                <div className="my-2">
                    <span className="text-lg mr-4 text-gray-500">ID</span>
                    <span>{book._id}</span>
                </div>
                <div className="my-2">
                    <span className="text-lg mr-4 text-gray-500">Title</span>
                    <span>{book.title}</span>
                </div>
                <div className="my-2">
                    <span className="text-lg mr-4 text-gray-500">Author</span>
                    <span>{book.author}</span>
                </div>
                <div className="my-2">
                    <span className="text-lg mr-4 text-gray-500">Publish Year</span>
                    <span>{book.publishYear}</span>
                </div>
                <div className="my-2">
                    <span className="text-lg mr-4 text-gray-500">Created At</span>
                    <span>{new Date(book.createdAt).toLocaleString()}</span>
                </div>
                <div className="my-2">
                    <span className="text-lg mr-4 text-gray-500">Updated At</span>
                    <span>{new Date(book.updatedAt).toLocaleString()}</span>
                </div>
              </div>
            )}
        </div>
    )
}

export default ShowBook;