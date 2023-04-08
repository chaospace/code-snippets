type Listener = <T extends {[key: string]: any}>(state: T) => void;

export {Listener};
