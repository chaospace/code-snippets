# Task와 MicroTask

## 이벤트 루프

(브라우저, 노드)에서 가지고 있는 장치.  
콜 스택과 (마이크로)태스크 큐(=콜백 큐)를 감시하며, 콜 스택이 비어있을 경우에 태스크 규에서  
태스크(콜백함수)를 가져와 콜 스택에 넣어 실행시키는 기능을 한다.

## 태스크 큐 vs 마이크로태스크 큐

- **태스크 큐에 들어가는 경우( 즉발성 콜백 처리 )**
  - setTimeout, setInterval, requestAnimationFrame
- **마이크로 태스크 큐에 들어가는 경우 ( 비동기 콜백 처리 )**
  - process.nextTick, Promise, Object.observe

## 처리 우선순위는?

마이크로태스크가 먼저 처리된다.  
이벤트 루프에 Task큐와 MicroTask큐가 동시에 있으면 이벤트 루프는 MicroTask의 콜백을 먼저 실행 후 Task큐에 콜백을 처리한다.

- setTimeout에 함수에 설정하는 지연타임이 정확히 보장되지 않는 이유로 이벤트 루프에서 처리하는 우선순위가 밀리면 늦어질 수 있음.
