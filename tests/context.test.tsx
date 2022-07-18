// context 테스트
import React, {ReactNode} from 'react';
import build from '@/utils/reactContextBuilder';
import {cleanup, render, screen} from '@testing-library/react';

type NameContextProps = {
  nick: string;
  job: string;
};

const [useNameContext, NameContextProvider, NameContextConsumer] = build<NameContextProps>();

const providerRender = (ui: ReactNode, providerValue: NameContextProps) => {
  return render(<NameContextProvider value={providerValue}>{ui}</NameContextProvider>);
};

describe('context 테스트', () => {
  it('NameContextConsumer를  통한 Context값 접근', () => {
    render(
      <NameContextProvider value={{nick: 'aa', job: 'frontend'}}>
        <NameContextConsumer>{value => <button>{value.job}</button>}</NameContextConsumer>
      </NameContextProvider>
    );
    expect(screen.getByRole('button').textContent).toEqual('frontend');
  });

  it('훅을 이용한 Context값 테스트', () => {
    const Foo = () => {
      const {job} = useNameContext();
      return <button type="button">{job}</button>;
    };
    providerRender(<Foo />, {nick: 'monstor', job: 'hunter'});
    expect(screen.getByRole('button').textContent).toEqual('hunter');
  });
});
