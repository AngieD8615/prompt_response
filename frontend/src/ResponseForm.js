import {useState} from "react";



export default function ResponseForm ({ onSubmit, statuses, status }) {

    const [response, setResponse] = useState("");
    const handleChange = (e) => {
        setResponse(e.target.value)
    }

    return (
        <>
            <form onSubmit={(e) => onSubmit(e, response)}>
                <label>Enter your response here:
                    <input type="text" name="response" onChange={(e) => {handleChange(e)}}/>
                </label>
                 <button disabled={!response || status === statuses.processing}>Submit</button>

            </form>
        </>
    )
}