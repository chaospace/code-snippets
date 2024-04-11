# Prototype

자바스크립트 객체는 [[Prototype]]이라는 내부 프로퍼티가 있고 다른 객체를 참조하는 단순 레퍼런스로 활용된다.  
거의 모든 객체가 이 프로퍼티에 null이 아닌 값이 생성 시점에 할당된다. 드물긴 하지만 [[Prototype]] 링크가 빈 객체도 가능하다.

<mark>myObject.a</mark> 처럼 객체 프로퍼티 참조 시 <mark>[[Get]]</mark>에서 해당 프로퍼티가 존재하는지 찾아보고 존재하지 않으면 객체의 <mark>[[Prototype]]</mark>링크를 따라가 찾는다.

자바스크립트는 진정한 의미의 클래스를 제공하지 않으므로 prototype체인을 이용한 위임패턴을 이용하는게 코드의 간결성 및 추적에 도움이 된다.