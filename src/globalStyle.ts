import { createGlobalStyle } from 'styled-components';
import resetStyle from '@/styles/resetStyle';
import inputStyle from "@/styles/inputStyle";
import fontStyle from '@/styles/fontStyle';

const GlobalStyle = createGlobalStyle`
 @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');
 ${resetStyle};
 ${fontStyle};
 ${inputStyle};
`;

export default GlobalStyle;
