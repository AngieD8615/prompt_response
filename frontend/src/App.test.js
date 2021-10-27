import {fireEvent, getByLabelText, render, screen } from '@testing-library/react';
import App from './App';
import {serverURL} from "./serverURL";

const dummyPromise = new Promise(()=> {})

test('Requests the list of prompts from the server', () => {
    const axios = {get: jest.fn(x => dummyPromise)};
    render(<App axios={axios} />);
    expect(axios.get)
        .toHaveBeenCalledWith(serverURL + '/prompts');
});

describe('While prompts are Loading', () => {
    test('shows a loading indicator', () => {
        const axios = {get: x => dummyPromise};
        render(<App axios={axios} />);
        screen.getByText("Loading...")
    });

    test('should not show form field or submit button', () => {
        const axios = {get: x => dummyPromise};
        render(<App axios={axios} />);
        expect(screen.queryByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'}))
            .toBeNull();
    })
})

describe('When the GET request for prompts succeeds', () => {
    test('shows the first prompt', async function () {
        const resolvedPromise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        });
        const axios = {get: x => resolvedPromise};
        render(<App axios={axios} />);
        await screen.findByText('Hello, World')
    });

    test('renders the form text field when the prompt is displayed', async function () {
        const resolvedPromise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        })
        const axios = {get: x => resolvedPromise};
        render(<App axios={axios} />)
        await screen.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});
    })

    test('renders the submit button when there is text in the form', async function () {
        const resolvedPromise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        })
        const axios = {get: x => resolvedPromise};

        const app = render(<App axios={axios} />)

        const responseInput = await app.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: "this is my response"}})
        await screen.findByRole('button')


    })

});

describe('When the get request for prompts fails', () => {
    test('shows an error', async function () {
        const rejectedPromise = Promise.reject(new Error("this is an err"));
        const axios = {get: x => rejectedPromise};

        render(<App axios={axios} />)

        await screen.findByText("Failed to load data")
    });
})

describe('While posting the response form', () => {

    test('When the post request for ResponseForm fails, Show an error', async function () {
        const promise = Promise.resolve({
            data: [{id: 1, prompt: 'Hello World'}]
        })
        const axios = {
            get: x => promise,
            post: x => Promise.reject(new Error("this is an err in the post"))
        };
        const app = render(<App axios={axios} />)

        const responseInput = await app.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});


        fireEvent.change(responseInput, {target: {value: 'this is my response'}})
        const btn = await app.findByRole('button')
        fireEvent.click(btn)

        await screen.findByText("response rejected")
    })
})

