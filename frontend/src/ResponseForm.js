import {useState} from "react";



export default function ResponseForm ({ axios, promptID, statuses, status, setStatus, response, setResponse }) {

    const handleChange = (e) => {
        setResponse(e.target.value)
    }

    const handleSubmit = (e) => {
        console.log("in handle submit")
        e.preventDefault()
        setStatus(statuses.processing)
        const body = {
            prompt_id: promptID,
            response: response
        }
        axios.post('http://localhost:8080/api/responses', body)
            .then(() => {
                console.log("in axios then")
                setStatus(statuses.submitted)
            })
            .catch(() => {
                setStatus(statuses.rejected)
            })
    }

    const statusText = () => {
        if (status === statuses.submitted) {
            return response
        } else if (status === statuses.rejected) {
            return "response rejected"
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Enter your response here:
                    <input type="text" name="response" onChange={(e) => {handleChange(e)}}/>
                </label>
                 <button disabled={!response || status === statuses.processing}>Submit</button>
                {statusText()}
            </form>
        </>
    )
}