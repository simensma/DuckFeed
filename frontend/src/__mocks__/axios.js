/**
 * Mock axios implementation used for testing.
 */
const AxiosMock = {
  get: jest.fn(() => Promise.resolve({ data: {} })),
  create: jest.fn(() => AxiosMock),
};

export default AxiosMock;
