import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Create() {

        const [title,setTitle] = useState('');
        const [body,setBody] = useState('');
        const [author,setAuthor] = useState('mm');
        const [isPending,setIsPending] = useState(false);
        const history = useHistory();

        const handleSubmit = (e)=>{
            e.preventDefault();
            const blog = {title,body,author};

            setIsPending(true);
            //post 
            fetch('http://localhost:8000/blogs',{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(blog)
            }).then(()=>{
                setIsPending(false);
                history.push('/');
            })
        }

    return (
        <div className="create">
            <h2>Add a new Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title</label>
                <input 
                    type="text" 
                    value={title}
                    onChange = {(e)=>setTitle(e.target.value)}
                />
                <label>Blog body</label>
                <textarea
                    required
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                ></textarea>
                <label>Blog author</label>
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="employee1">employee1</option>
                    <option value="employee2">employee2</option>
                </select>
                { !isPending && <button>Add Blog</button>}
                { isPending && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    )
}

export default Create
