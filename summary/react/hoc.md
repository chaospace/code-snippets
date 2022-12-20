# 고차 컴포넌트

이전 버전 리액트에서는 횡단 관심사 분리를 위해 mixin을 권장했지만 이는 더 많은 문제를 야기했고, 해결을 위해 원본 컴포넌트를 수정하지 않는<code>컴포넌트 조합(composition)</code>을 추천합니다.

> 고차 컴포넌트는 원본 코드를 수정하지 않는게 핵심입니다.

```typescript
function logProps(InputComponent) {
  InputComponent.prototype.componentDidUpdate = function (prevProps) {
    console.log('Current props: ', this.props);
    console.log('Previous props: ', prevProps);
  };
  // 원본의 입력을 반환한다는 것은 이미 변형되었다는 점을 시사합니다.
  return InputComponent;
}

// EnhancedComponent 는 props를 받을 때 마다 log를 남깁니다.
const EnhancedComponent = logProps(InputComponent);

// 원본을 수정하지 않는 조합방식
function logProps(WrappedComponent) {
  return class extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    }
    render() {
      // 들어온 component를 변경하지 않는 container입니다. 좋아요!
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

## 주의사항!

### render함수 안에서 고차 컴포넌트를 사용하지 마세요.

랜더함수에서 고차함수를 동적으로 사용한다면 매번 새로운 컴포넌트로 인식하고 랜더 퍼포먼스가 떨어지게 된다.

```typescript
render() {
  // render가 호출될 때마다 새로운 버전의 EnhancedComponent가 생성됩니다.
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 때문에 매번 전체 서브트리가 마운트 해제 후 다시 마운트 됩니다!
  return <EnhancedComponent />;
}
```

### static함수는 직접 복사한다.

### ref는 전달되지 않는다.
