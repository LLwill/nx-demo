import { render } from '@testing-library/react';

import SseDemo1 from './sse-demo-1';

describe('SseDemo1', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SseDemo1 />);
    expect(baseElement).toBeTruthy();
  });
});
