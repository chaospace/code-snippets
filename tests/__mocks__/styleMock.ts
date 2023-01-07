import {StyledComponent} from 'styled-components';

function getStyledCompStyle(Component: StyledComponent<'div', any>, index = 0) {
  const compClass = Component?.styledComponentId;
  const compRoots = document.getElementsByClassName(compClass);
  //console.log('compRoots', compClass, 'compRoots[index]', compRoots[index]);
  return global.window.getComputedStyle(compRoots[index] as Element);
}

export {getStyledCompStyle};
