# 폼 유효성 처리

form필드에 유효성 처리를 위해 라이브러리를 많이 사용했지만 브라우저에서 제공해 주는 api를 이용해도 충분히 효율적인 유효성 처리가 가능한 것 같아 문서를 보고 정리함.

제공 api를 통한 유효성 처리가 좋은 점은 코드를 적게 작성하고 포커스 처리도 자동으로 해줘서 좋다.

샘플코드를 보면 바로 알기 쉬움.

```html
<form>
  <div class="form-group">
    <label>
      이름
      <!-- required속성을 이용한 필수 처리및 pattern을 통해 3글자 이상을 요청 -->
      <input type="text" name="name" pattern=".{3,}" required />
    </label>
  </div>
</form>
```

제공되는 메시지를 수정할 수 있는 방법도 제공하며 사용법은 아래와 같다.

```javascript
const inputEle = document.querySelector("[name='name']");
// submit이벤트 시 유효성이 맞지 않은 필드는 invalid이벤트가 발생하고
// 이때 setCustomValidity를 이용하면 메시지 변경
inputEle.addEventListener('invalid', () => {
  inputEle.setCustomValidity('이름은 3자이상 넣어주세요');
});
```

제공되는 api가 충분히 좋지만 좀더 제어를 하고 싶은 경우는 <code>novalidate</code>속성을 form에 추가하면 모든 것은 제어할 수 있다.

```html
<form novalidate onsubmit="onSubmit(event)">
  <label>
    <input type="text" name="name" pattern=".{3,}" required />
  </label>
</form>
<script>
  const inputEle = document.querySelector("[name='name']");
  inputEle.addEventListener('input', () => {
    // validity.patternMismatch속성을 통해 패턴 유효성 통과 여부를 판단한다.
    if (!inputEle.validity.patternMismatch) {
      inputEle.setCustomValidity('');
    } else {
      inputEle.setCustomValidity('이름은 3자이상 넣어주세요');
      // 메시지를 보여준다.
      inputEle.reportValidity();
    }
  });

  const formEle = document.forms[0];
  function onSubmit(event) {
    // 폼 필드값의 유효성을 체크한다.
    if (formEle.checkValidity()) {
      alert('ok');
    } else {
      event.preventDefault();
      return false;
    }
  }
</script>
```

폼 엘리먼트에 validity속성은 ValidityState객체로 다음과 같은 정보를 제공한다.

## ValidityState

ValidityState 인터페이스는 제약 유효성 검사에 대해 요소가 가질 수 있는 유효성 상태를 나타내며, 요소의 값이 유효하지 않은 경우 그 이유에 대한 설명을 도와줍니다.

<code>badInput</code>

> 사용자가 입력한 값을 브라우저가 변환하지 못했음을 나타내는 Boolean 값입니다.

<code>customError</code>

> setCustomValidity() 메서드를 사용해 요소의 사용자 지정 유효성 메시지를 비어있지 않은 문자열로 설정했는지를 나타내는 Boolean 값입니다.

<code>patternMismatch</code>

> 값이 주어진 pattern 특성을 만족하지 못하는지 나타내는 Boolean 값입니다 참일 경우, CSS :invalid 의사 클래스를 만족합니다.

<code>rangeOverflow</code>

> 값이 주어진 max 특성보다 큰지 나타내는 Boolean 값입니다. 참일 경우, CSS :invalid (en-US)와 :out-of-range 의사 클래스를 만족합니다.

<code>rangeUnderflow</code>

> 값이 주어진 min 특성보다 작은지 나타내는 Boolean 값입니다. 참일 경우, CSS :invalid (en-US)와 :out-of-range의사 클래스를 만족합니다.

<code>stepMismatch</code>

> 값이 주어진 step 특성의 규칙을 만족하지 않는지 (즉, 값을 스텝 값으로 나눌 수 없는지) 나타내는 Boolean 값입니다. 참일 경우, CSS :invalid와 :out-of-range 의사 클래스를 만족합니다.

<code>tooLong</code>

> 값이 HTMLInputElement 또는 HTMLTextAreaElement객체의 maxlength 값보다 긴지 나타내는 Boolean 값입니다. 참일 경우, CSS :invalid 와 :out-of-range 의사 클래스를 만족합니다.

<code>tooShort</code>

> 값이 HTMLInputElement 또는 HTMLTextAreaElement 객체의 minLength 값보다 짧은지 나타내는 Boolean 값입니다. 참일 경우, CSS :invalid와 :out-of-range (en-US) 의사 클래스를 만족합니다.

<code>typeMismatch</code>

> 값이 입력 유형에서 요구하는 형식(type이 email이나 url인 경우)에 맞지 않는지 나타내는 Boolean 값입니다. 참일 경우, CSS :invalid 의사 클래스를 만족합니다.

<code>valid</code>

> 요소가 모든 유효성 제약을 만족하여 유효한 상태인지 나타내는 Boolean 값입니다. 참일 경우 CSS :valid 의사 클래스를, 거짓일 경우 :invalid 의사 클래스를 만족합니다.

<code>valueMissing</code>

> 요소가 required 특성을 가지고 있지만 값은 없는 경우 참인 Boolean 값입니다. 참일 경우, CSS :invalid 의사 클래스를 만족합니다.

**ValidityState에 제공되는 상태값을 판단해 상황별 메시지 설정이 가능하다.**

```javascript
function setValidityMessage(state) {
  if (state.valueMissing) {
    target.setCustomValidity('값이 비었습니다.');
  } else if (state.typeMismatch) {
    target.setCustomValidity('지정된 타입이 아닙니다.');
  }
  //....etc
}
```

**novalidate속성을 이용할 때 유효성 처리전 기존 인풋들에 customError메시지를 초기화 한 후에 체크를 해야 된다.**

```javascript
function onSubmit(event) {
  // submit전 이전 에러 상태는 모두 초기화
  target.setCustomValidity('');

  // 개별 필드 유효성을 처리
  target.checkValidity();
  // 다른 필드 유효성 처리....

  // 폼에 유효성을 처리를 통해 전체 확인
  if (form.checkValidity()) {
  } else {
    // 통과하지 못하면
  }
}
```
