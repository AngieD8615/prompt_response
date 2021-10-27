import {useState} from "react";
import {responseStatuses} from "./responseStatuses";


export default function ResponseForm({onSubmit, status}) {

    const [response, setResponse] = useState("");
    const handleChange = (e) => {
        setResponse(e.target.value)
    }

    const formOnSubmit = (e) => {
        e.preventDefault()
        onSubmit(response)
    }
    return (
        <>
            <form onSubmit={formOnSubmit}>
                <label>Enter your response here:
                    <input
                        type="text"
                        name="response"
                        onChange={(e) => {
                            handleChange(e)
                        }}
                    />
                </label>
                <button
                    disabled={!response || status === responseStatuses.processing}
                >
                    Submit
                </button>
            </form>
        </>
    )
}