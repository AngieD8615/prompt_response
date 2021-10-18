import {fireEvent, render, screen} from '@testing-library/react';
import ResponseForm from "./ResponseForm";
import App from "./App";

test ("Post request is called on submit", () => {
    const dummyPromise = new Promise(()=> {})

    const axios = {
        post: jest.fn(x => dummyPromise),
    };

    render(<ResponseForm axios={axios} promptID={1} />)

    const responseInput = screen.getByLabelText('Enter your response here:',
        {selector: 'input[type="text"]'});

    fireEvent.change(responseInput, {target: {value: 'this is my response'}})
    const btn = screen.getByRole('button')
    fireEvent.click(btn)

    expect(axios.post)
        .toHaveBeenCalledWith('http://localhost:8080/api/responses',
            {"prompt_id": 1, "response": "this is my response"})

})

test ("disable submit until there is a response", () => {
    const axios = {};

    render(<ResponseForm axios={axios} promptID={1} />)

    expect(screen.getByRole('button')).toBeDisabled()

    const responseInput = screen.getByLabelText('Enter your response here:',
        {selector: 'input[type="text"]'});

    fireEvent.change(responseInput, {target: {value: 'text is not entered'}})
    expect(screen.getByRole('button')).toBeEnabled()

})