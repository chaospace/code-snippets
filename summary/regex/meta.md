# 유용한 정규표현식 정리

1. **.** (아무런 문자 하나와 일치)

   **정규식**

   > <mark>s.e</mark>

   **활용예**

   > teljalfdjalsdfj <mark>she's</mark> aljflsjaelaja <mark>sce</mark>

   **실제 마침표를 찾고 싶다면 \\(역슬래시)를 이용**

   **정규식**

   > 세\\.

   **활용예**

   > ㅅㅁ닝런미얼 우리나란. 만ㅁ세.

2. [] (문자 집합을 표현하는 대괄호)

   **정규식**

   > f[ie]  
   > f다음 i혹은 e와 일치하는 경우

   **활용예**

   > <mark>fi</mark>re  
   > siren  
   > <mark>fe</mark>male  
   > apple

3. ^ (특정문자를 제외하는 검색 캐럿)

   **정규식**

   > ...[^0-9]

   **활용예**

   > <mark>adcd</mark>.txt  
   > abcd0.txt

4. 주요 메타문자

   | 메타문자 | 설명                        |
   | -------- | --------------------------- |
   | \v       | 수직 탭                     |
   | \n       | 개행                        |
   | \f       | 폼피드                      |
   | \r       | 캐리지 리턴                 |
   | \t       | 탭                          |
   | [\b]     | 백스페이스                  |
   | \d       | [0-9]와 동일한 기능         |
   | \D       | [^0-9]와 동일한 기능        |
   | \w       | [a-zA-Z0-9]와 동일한 기능   |
   | \W       | [^a-za-z0-9]와 동일한 기능  |
   | \s       | [\f\n\r\t\v]와 동일한 기능  |
   | \S       | [^\f\n\r\t\v]와 동일한 기능 |
   | \x       | 16진수 숫자와 일치          |
   | \0       | 8진수 숫자와 일치           |

5. \+ (문자가 하나 이상 있으면 일치)
   **정규식**

   > \w+@\w+\.\w+

   **활용예**

   > <mark>id@gmail.com</mark>  
   > id@daumnet  
   > <mark>id@nate.com</mark>

6. \* (문자가 없거나, 하나 이상 있으면 일치)

   **정규식**

   > bo\*

   **활용예**

   > <mark>b</mark>  
   > <mark>bo</mark>  
   > <mark>booo</mark>

7. ? (문자가 없거나, 하나만 있으면 일치)

   **정규식**

   > aabb?cc

   **활용예**

   > <mark>aabbcc</mark>  
   > aabbbcc
   > <mark>aabcc</mark>
