/**
 * 돔 비교 함수 구현
 *
 * - 돔에 속성 길이 비교
 * - 돔에 속성 값 비교
 * - 돔에 textContent 비교
 *
 * - 하위 돔 요소를 반복하면 순회
 */

const applyDiff = (parentNode, realNode, virtualNode) => {
  if (realNode && !virtualNode) {
    console.log('실제 돔 제거!', realNode);
    realNode.remove();
    return;
  }

  if (!realNode && virtualNode) {
    console.log('가상돔 추가!', virtualNode);
    parentNode.appendChild(virtualNode);
    return;
  }

  // 통으로 변경될 경우
  if (isChangedNode(realNode, virtualNode)) {
    console.log('변경!');
    realNode.replaceWith(virtualNode);
    return;
  }

  // 하위노드 비교를 위한 재귀처리
  const realChildren = Array.from(realNode.children);
  const virtualChildren = Array.from(virtualNode.children);
  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    applyDiff(realNode, realChildren[i], virtualChildren[i]);
  }
};

const isChangedNode = (node1, node2) => {
  const n1Attributes = node1.attributes;
  const n2Attributes = node2.attributes;
  // 속성에 수가 다르면 변경
  if (n1Attributes.length !== n2Attributes.length) {
    return true;
  }

  // 속성 값이 다른 경우 변경
  const differenceAttributes = Array.from(n1Attributes).find(attr => {
    const {name} = attr;
    const attribute1 = node1.getAttribute(name);
    const attribute2 = node2.getAttribute(name);
    return attribute1 !== attribute2;
  });

  if (differenceAttributes) {
    return true;
  }

  // 텍스트가 다른 경우 변경
  if (
    node1.children.length == 0 &&
    node2.children.length == 0 &&
    node1.textContent !== node2.textContent
  ) {
    return true;
  }

  return false;
};

export default applyDiff;
