import {fireEvent, getByLabelText, render, screen } from '@testing-library/react';
import App from './App';

const dummyPromise = new Promise(()=> {})

test('Requests the list of prompts from the server', () => {
    const axios = {get: jest.fn(x => dummyPromise)};
    render(<App axios={axios} />);
    expect(axios.get)
        .toHaveBeenCalledWith('http://localhost:8080/api/prompts');
});

describe('While prompts are Loading', () => {
    test('shows a loading indicator', () => {
        const axios = {get: jest.fn(x => dummyPromise)};
        render(<App axios={axios} />);
        screen.getByText("Loading...")
    });

    test('should not show form field or submit button', () => {
        const axios = {get: jest.fn(x => dummyPromise)};
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
        const axios = {get: jest.fn(x => resolvedPromise)};
        render(<App axios={axios} />);
        await screen.findByText('Hello, World')
    });

    test('renders the form text field when the prompt is displayed', async function () {
        const resolvedPromise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        })
        const axios = {get: jest.fn(x => resolvedPromise)};
        render(<App axios={axios} />)
        await screen.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});
    })
    test('renders the submit button when there is text in the form', async function () {
        const resolvedPromise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        })
        const axios = {get: jest.fn(x => resolvedPromise)};

        const app = render(<App axios={axios} />)

        const responseInput = await app.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: "this is my response"}})
        await screen.findByRole('button')


    })
    test('should not render submit button if the form field is empty', async function () {
        const resolvedPromise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        })
        const axios = {get: jest.fn(x => resolvedPromise)};

        render(<App axios={axios} />)

        await screen.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        await expect(screen.queryByRole('button')).toBeNull()
    })


});

describe('When the get request for prompts fails', () => {
    test('shows an error', async function () {
        const rejectedPromise = Promise.reject(new Error("this is an err"));
        const axios = {get: jest.fn(x => rejectedPromise)};

        render(<App axios={axios} />)

        await screen.findByText("Failed to load data")
    });
})

describe('While posting the response form', () => {

    const displayPrompt = () => {

    }

    test("On submit, there is a post request to the server", async function() {
        const resolvedPromise = Promise.resolve({
            data: [{id: 1, prompt: 'Hello World'}]
        })
        const axios = {
            post: jest.fn(x => dummyPromise),
            get: jest.fn(x => resolvedPromise)
        };
        const app = render(<App axios={axios} />)

        const responseInput = await app.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: 'this is my response'}})
        const btn = await app.findByRole('button')
        fireEvent.click(btn)

        expect(axios.post)
            .toHaveBeenCalledWith('http://localhost:8080/api/responses',
                {"prompt_id": 1, "response": "this is my response"})


    })
    test('When post request succeeds, alert shows post successful', async function () {
        const resolvedPostPromise = Promise.resolve();
        const resolvedPromise = Promise.resolve({
            data: [{id: 1, prompt: 'Hello World'}]
        })
        const axios = {
            post: jest.fn(x => resolvedPostPromise),
            get: jest.fn(x => resolvedPromise)
        };
        const app = render(<App axios={axios} />)

        const responseInput = await app.findByLabelText('Enter your response here:',
            {selector: 'input[type="text"]'});

        fireEvent.change(responseInput, {target: {value: 'this is my response'}})
        const btn = await app.findByRole('button')
        fireEvent.click(btn)

        await screen.findByText("response submitted")

    })
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

