import React from 'react';
import Counter from './Counter';
import {render, screen, fireEvent} from '@testing-library/react';

it("should render COUNT : 0", () => {

    render(<Counter title="count"/>)
    const element = screen.getByText(/COUNT:0/);
    expect(element).toBeInTheDocument();
})
it("should render COUNT : 1 on click of increment btn", () => {

    render(<Counter title="count"/>);
    const btn = screen.getByText(/Increment/i);
    fireEvent.click(btn);
    const element = screen.getByText(/COUNT:1/);
    expect(element).toBeInTheDocument();
});
it("should render an input with the value as 0", () => {
    
    render(<Counter title="count"/>);
    const input =  screen.getByTestId("ctr") as HTMLInputElement;
    expect(input).toBeTruthy();
    expect(input.value).toBe("0");
})

it("should render COUNT : 1 onchange of input to 10", () => {
    
    render(<Counter title="count"/>);
    const input =  screen.getByTestId("ctr") as HTMLInputElement;
    fireEvent.change(input, {target: {value: 10}})

    const element = screen.getByText(/COUNT:10/);
    expect(element).toBeInTheDocument();
})
