import React, { useState, useEffect } from "react"
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const currentYear = new Date().getFullYear();
    const [error, setError] = useState('')
    const {enqueueSnackbar} = useSnackbar();
    const { id } = useParams();
    
    useEffect(() => {
        setIsLoading(true);
        axios.get(`http://localhost:5555/books/${id}`).then((response) => {
            setTitle(response.data.title);
            setAuthor(response.data.author);
            setPublishYear(response.data.publishYear);
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
            enqueueSnackbar('Error', { variant: 'error' });
            console.log(error)
        })
    }, [id])

    const handleEditBook = () => {
        const validYear = parseInt(publishYear)
        if (isNaN(validYear) || validYear < 1000 || validYear > currentYear) {
          setError('Please enter a valid year!');
          return;
        }
        const data = {
            title,
            author,
            publishYear: validYear,
        };
        setIsLoading(true);
        axios.put(`http://localhost:5555/books/${id}`, data).then(() => {
            setIsLoading(false);
            enqueueSnackbar('Book Edited Successfully', { variant: 'success' });
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
            <h1 className="text-2xl text-center my-4">Edit Book</h1>
            {isloading ? <Spinner /> : ''}
            <div className="flex flex-col border-4 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-lg mr-4 text-gray-500">Title</label>
                    <input type="text" value={title} className="border-2 border-gray-500 px-4 py-2 w-full" onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="my-4">
                    <label className="text-lg mr-4 text-gray-500">Author</label>
                    <input type="text" value={author} className="border-2 border-gray-500 px-4 py-2 w-full" onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="my-4">
                    <label className="text-lg mr-4 text-gray-500">Publish Year</label>
                    <input type="number" min="1000" max={currentYear} value={publishYear} className="border-2 border-gray-500 px-4 py-2 w-full" 
                        onChange={(e) => {
                            setPublishYear(e.target.value);
                            setError('');
                        }} />
                    <div className="text-md text-red-500">{error}</div>
                </div>
                    <button onClick={handleEditBook} className="p-3 w-[250px] rounded-lg mx-auto bg-sky-400 m-5">Save</button>
            </div>
           
            
        </div>
    )
}

export default EditBook;