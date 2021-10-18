import {useState} from "react";

export default function ResponseForm ({ promptID, postResponse }) {
    const [resSubSuc, setResSubSuc] = useState( false)
    const [resSubRej, setResSubRej] = useState( false)
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
        const result = postResponse(body)
        result
            .then(() => {
                setResSubSuc(true)
            })
            .catch(() => {
                setResSubRej(true)
            })
    }


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <label>Enter your response here:
                    <input type="text" name="response" onChange={(e) => {handleChange(e)}}/>
                </label>
                {response.length === 0 ? null : <button>Submit</button>}
                {resSubSuc ? "response submitted" : null}
                {resSubRej ? "response rejected" : null}
            </form>
        </>
    )
}