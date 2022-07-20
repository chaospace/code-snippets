# 유용한 정규표현식 정리

1. 아무런 문자 하나와 일치하는 **.**

   **정규식**

   > <mark>s.e</mark>

   **활용예**

   > teljalfdjalsdfj <mark>she's</mark> aljflsjaelaja <mark>sce</mark>

   **실제 마침표를 찾고 싶다면 \\(역슬래시)를 이용**

   **정규식**

   > 세\\.

   **활용예**

   > ㅅㅁ닝런미얼 우리나란. 만ㅁ세.

2. 문자 집합을 표현하는 대괄호(<mark>[]</mark>)

   **정규식**

   > f[ie]  
   > f다음 i혹은 e와 일치하는 경우

   **활용예**

   > <mark>fi</mark>re  
   > siren  
   > <mark>fe</mark>male  
   > apple
