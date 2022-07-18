import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/react-hooks';
import {configure} from '@testing-library/dom';
import {cleanup} from '@testing-library/react';

configure({
  testIdAttribute: 'data-my-test-id',
  computedStyleSupportsPseudoElements: true
});

// 모든 테스트 후 cleanup 적용
afterEach(cleanup);
