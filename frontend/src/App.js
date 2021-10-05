import './App.css';
import Prompt from './Prompt'
import {useEffect, useState} from "react";

const axios = require('axios')

function App() {
    const [prompts, setPrompts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const curPrompt = 0;

    const getPrompts = () => {
        axios.get('http://localhost:8080/api/prompts')
            .then((response) => {
                setPrompts(response.data)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isLoading) {
            getPrompts();
        }
    })

    return (
        <div>
            {isLoading ? null : prompts[curPrompt].prompt}
        </div>
    );
}

export default App;
