import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/react-hooks';
import {configure} from '@testing-library/dom';

configure({
  testIdAttribute: 'data-my-test-id',
  computedStyleSupportsPseudoElements: true
});
