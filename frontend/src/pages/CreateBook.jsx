import React, { useState } from "react"
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publishYear
        };
        setIsLoading(true);
        axios.post('http://localhost:5555/books', data).then(() => {
            setIsLoading(false);
            enqueueSnackbar('Book created successfully', { variant: 'success' });
            navigate('/');
            document.getElementById('bookForm').reset();
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
            <h1 className="text-2xl text-center my-4">Create Book</h1>
            {isloading ? <Spinner /> : ''}
            <form id="bookForm">
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
                    <input type="text" value={publishYear} className="border-2 border-gray-500 px-4 py-2 w-full" onChange={(e) => setPublishYear(e.target.value)} />
                </div>
                    <button onClick={handleSaveBook} className="p-3 w-[250px] rounded-lg mx-auto bg-sky-300 m-5">Save</button>
            </div>
            </form>
            
        </div>
    )
}

export default CreateBook;