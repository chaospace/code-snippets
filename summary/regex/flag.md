## 정규식 주요 플래그 정리

- y : 검색 위치를 지정할 수 있음.

  ### g 플래그를 사용하는 경우

  암묵적으로 regexp의 lastIndex는 0부터 검색을 시작하고  
   <mark>exec</mark>를 수행하면 매칭된 결과에 따라 lastIndex가 조정됨.

  ```javascript
  let str = 'let varName';

  let regexp = /\w+/g;
  alert(regexp.lastIndex); // 0 (initially lastIndex=0)

  let word1 = regexp.exec(str);
  alert(word1[0]); // let (1st word)
  alert(regexp.lastIndex); // 3 (position after the match)

  let word2 = regexp.exec(str);
  alert(word2[0]); // varName (2nd word)
  alert(regexp.lastIndex); // 11 (position after the match)

  let word3 = regexp.exec(str);
  alert(word3); // null (no more matches)
  alert(regexp.lastIndex); // 0 (resets at search end)
  ```

### loop를 통한 매칭 확인

```javascript
let str = 'let varName';
let regexp = /\w+/g;

let result;

while ((result = regexp.exec(str))) {
  alert(`Found ${result[0]} at position ${result.index}`);
  // Found let at position 0, then
  // Found varName at position 4
}
```

regexp.exec는 str.matchAll 메서드의 대안으로 다른 방법과 달리 lastIndex를 설정하여 주어진 위치에서 검색을 시작할 수 있다.

```javascript
let str = 'let varName = "value"';

let regexp = /\w+/g; // without flag "g", property lastIndex is ignored

regexp.lastIndex = 4;

let word = regexp.exec(str);
alert(word); // varName
```

g플래그와 함께 사용된 lastIndex는 정확히 그 위치에 매칭결과가 없어도 다음으로 이동하며 매칭결과를 찾는다.

```javascript
let str = 'let varName = "value"';

let regexp = /\w+/g;

regexp.lastIndex = 3;

let word = regexp.exec(str);
alert(word[0]); // varName
alert(word.index); // 4
```

**플래그 y를 이용하면 정확히 지정한 인덱스에서 검색을 합니다**

```javascript
let str = 'let varName = "value"';

let regexp = /\w+/y;

regexp.lastIndex = 3;
alert(regexp.exec(str)); // null (there's a space at position 3, not a word)

regexp.lastIndex = 4;
alert(regexp.exec(str)); // varName (word at position 4)
```
