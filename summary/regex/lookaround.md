유용한 정규표현식 정리

1. 전방탐색( lookahead )
   작선한 패턴에 일치하는 영역이 존재하여도 그 값이 제외되어서 나오는 패턴.
   표현은 아래와 같음.

   <mark>?=</mark> 이며, <mark>= 다음에 오는 문자가 일치하는 영역에서 제외</mark>, 반드시 소괄호로 감싸주어야 한다.

   **정규식**

   > .+(?=:)

   **적용 예**

   > <mark>http</mark>://www.test.com  
   > <mark>https</mark>://www.test.com

2. 후방탐색( lookbehind )  
    후방탐색 기호는 <mark>?<=</mark>입니다. 전방 탐색기호의 ?와 = 사이에 <기호가 추가된 것입니다.

   **정규식**

   > (?<=\$)[0-9.]+

   **활용예**

   > test-message $<mark>100</mark>  
   > another message 400$<mark>20</mark>

   **정규식**

   > (?<=,)[a-z\s!]+  
   > , 문자 뒤에 소문자와 공백(\s) 그리고 !문자로 구성된 문자열 탐색.

   **활용예**

   > Hello, <mark>world!</mark>

3. 부정형 전후방탐색 ( negative lookaround )

   | 표현  | 설명            |
   | ----- | --------------- |
   | (?=)  | 긍정형 전방탐색 |
   | (?!)  | 부정형 전방탐색 |
   | (?<=) | 긍정형 후방탐색 |
   | (?<!) | 부정형 후방탐색 |

   **정규식**

   > \b(?<!\$)\d+  
   > 단어 경계(\b)와 부정형 후방탐색을 같이 사용해 (?>!)$ 기호 뒤에 숫자가 들어간 것은 제외하고 숫자만 들어간 영역을 탐색

   **활용예**

   > test message $22 10$1 40 $100