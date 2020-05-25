const AxiosMock = {
    get: jest.fn(() => Promise.resolve({ data: {} }))
};

export default AxiosMock;
