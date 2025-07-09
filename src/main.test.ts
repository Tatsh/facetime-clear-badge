import { beforeEach, describe, expect, it, jest } from '@jest/globals';

global.ObjC = {
  ['import']: jest.fn(),
} as unknown as typeof global.ObjC;
import main from './main';

jest.mock('stdlib', () => ({}), { virtual: true });

const activateMock = jest.fn();
const quitMock = jest.fn();
const clickMock = jest.fn();
const delayMock = jest.fn();

global.Application = jest.fn((name: string) => {
  if (name === 'FaceTime') {
    return {
      activate: activateMock,
      quit: quitMock,
    };
  }
  if (name === 'System Events') {
    return {
      processes: {
        FaceTime: {
          visible: false,
          windows: [
            {
              radioGroups: [
                {
                  radioButtons: [{ click: clickMock }, { click: clickMock }],
                },
              ],
            },
          ],
        },
      },
    };
  }
  return {};
}) as unknown as typeof global.Application;
global.delay = delayMock as unknown as typeof global.delay;

describe('main', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.Application as jest.Mock).mockClear();
    delayMock.mockClear();
    clickMock.mockClear();
    activateMock.mockClear();
    quitMock.mockClear();
  });

  it('should activate FaceTime, swap tabs, and quit', () => {
    clickMock.mockImplementation(() => {});
    const result = main();
    expect(activateMock).toHaveBeenCalled();
    expect(delayMock).toHaveBeenCalledWith(2);
    expect(clickMock).toHaveBeenCalledTimes(4);
    expect(delayMock).toHaveBeenCalledWith(0.25);
    expect(delayMock).toHaveBeenCalledWith(1);
    expect(quitMock).toHaveBeenCalled();
    expect(result).toBe(0);
  });

  it('should quit and return 1 if clicking throws', () => {
    let callCount = 0;
    clickMock.mockImplementation(() => {
      callCount += 1;
      if (callCount === 2) throw new Error('fail');
    });
    const result = main();
    expect(activateMock).toHaveBeenCalled();
    expect(quitMock).toHaveBeenCalled();
    expect(result).toBe(1);
  });
});
