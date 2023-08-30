import { render } from '@testing-library/react';

import RobotList from './robot-list';

describe('RobotList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RobotList />);
    expect(baseElement).toBeTruthy();
  });
});
