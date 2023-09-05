import { render } from '@testing-library/react';

import SseBase from './sse-base';

describe('SseBase', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SseBase />);
    expect(baseElement).toBeTruthy();
  });
});
