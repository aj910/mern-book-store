import React, { useState, useEffect } from "react"
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setIsLoading(true);
        axios.delete(`http://localhost:5555/books/${id}`).then(() => {
            setIsLoading(false);
            enqueueSnackbar('Book Deleted Successfully', { variant: 'success' });
            navigate('/');
        })
            .catch((error) => {
                setIsLoading(false);
                enqueueSnackbar('Error', { variant: 'error' });
                console.log(error);
            });
    }
 
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-2xl text-center my-4">Delete Book</h1>
            {isloading ? <Spinner /> : ''}
            <div className="flex flex-col border-4 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
               <h3 className="text-xl text-center">Are you sure you want to delete this book?</h3>
                    <button onClick={handleDeleteBook} className="p-3 w-[200px] rounded-lg mx-auto bg-sky-300 m-4">Delete</button>
                    <button onClick={() => navigate('/')} className="p-3 w-[200px] rounded-lg mx-auto bg-sky-300 m-2">Cancel</button>
            </div>
           
            
        </div>
    )
}

export default DeleteBook;