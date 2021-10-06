import {useState} from "react";
import {useForm} from "react-hook-form"
import axios from "axios";

export default function ResponseForm({curPrompt}) {
    const {register, handleSubmit} = useForm();
    const [postComplete, setPostComplete] = useState(false)
    const [postFailed, setPostFailed] = useState(false)
    const onSubmit = data => {
        data.prompt_id = curPrompt;
        console.log(data);
        axios.post('http://localhost:8080/api/responses', data)
            .then(() => {
                setPostComplete(true)
            })
            .cathc(() => {
                setPostFailed(true)
            })
    }

    const alert = () => {
        if (postComplete) {
            return <alert>post complete</alert>
        } else if (postFailed) {
            return <alert>post failed</alert>
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("response", {required: true})} />
                <input type={"submit"}/>
            </form>
            {alert()}
        </div>
    )

}