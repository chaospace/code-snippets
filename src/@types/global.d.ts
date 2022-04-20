export interface ProcessEnv {
  [key: string]: string | undefined;
}

declare global {
  const env: {[key: string]: string | undefined};
  const kakao: any;
}
