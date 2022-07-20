const isArray = (value: unknown): value is any[] => Array.isArray(value);

export default isArray;
