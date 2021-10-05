import {render, screen} from '@testing-library/react';
import App from './App';
import Prompt from "./Prompt";
import axios from "axios";

test('Requests the list of prompts from the server', () => {
    const dummyPromise = new Promise(() => {});
    const axios = { get: jest.fn(x => dummyPromise)};
    render(<App axios={axios} />);
    expect(axios.get)
        .toHaveBeenCalledWith('http://localhost:8080/api/prompts');
});

test('shows a loading indicator', () => {
    const dummyPromise = new Promise(() => {});
    const axios = {get: jest.fn(x => dummyPromise)};
    render(<App axios={axios} />);
    screen.getByText("Loading...")
});

describe('When the request succeeds', () => {
    test('shows the first prompt', async function() {
        const promise = Promise.resolve({
            data: [{prompt: 'Hello, World'}]
        });
        const axios = { get: jest.fn(x => promise)};

        render(<App axios={axios} />);

        await screen.findByText('Hello, World')
    });
});

describe('When the request fails', () => {
    test('shows an error', async function() {
        const rejectedPromise = Promise.reject(new Error("this is an err"))
        const axios = {get: jest.fn(x => rejectedPromise)};

        render(<App axios={axios} />)

        await screen.findByText("Failed to load data")
    });
})