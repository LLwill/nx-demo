import { render } from '@testing-library/react';

import User from './user';
import React from 'react';

describe('User', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<User />);
    expect(baseElement).toBeTruthy();
  });
});
