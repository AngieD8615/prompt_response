import {useState} from "react";

const statuses = {
    initial: "initial",
    submitted: "submitted",
    rejected: "rejected"
};

export default function ResponseForm ({ promptID, axios }) {
    const [status, setStatus] = useState(statuses.initial);
    const [response, setResponse] = useState("");
    const handleChange = (e) => {
        setResponse(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            prompt_id: promptID,
            response: response
        }
        axios.post('http://localhost:8080/api/responses', body)
            .then(() => {
                setStatus(statuses.submitted)
            })
            .catch(() => {
                setStatus(statuses.rejected)
            })
    }

    const statusText = () => {
        if (status === statuses.rejected) {
            return "response rejected"
        } else if (status === statuses.submitted) {
            return "response submitted"
        }
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Enter your response here:
                    <input type="text" name="response" onChange={(e) => {handleChange(e)}}/>
                </label>
                 <button disabled={response.length === 0}>Submit</button>
                {statusText()}
            </form>
        </>
    )
}