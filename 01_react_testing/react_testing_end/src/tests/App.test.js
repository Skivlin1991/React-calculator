import React from "react";
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('should render react link', () => {
    const { asFragment } = render(<App />);
    expect(asFragment(<App />)).toMatchSnapshot()
  });
})

