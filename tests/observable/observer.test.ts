import createModel from './model';
import createObserbableProxy from './observableProxy';
import createProxyActions from './proxyModel';

describe.skip('옵저버 모델 테스트', () => {
  it('모델 변경시 change이벤트가 발생한다', () => {
    const model = createModel();
    //console.log('model', model);
    model.addChangeListener((state: any) => {
      console.log('state', state);
    });
    model.addItem('추가 아이템');
    model.updateItemText(0, '변경 텍스트');
    model.updateItemText(1, '추가 아이템');
  });
});

describe('proxy모델 테스트', () => {
  it('프록시를 이용한 모델 이벤트', () => {
    const obserableState = createObserbableProxy();
    const actions = createProxyActions(obserableState);
    obserableState.addChangeListener((data: any) => {
      console.log('change-data', data);
    });

    actions.addItem('할일 추가');
    actions.addItem('-');
    actions.updateItemText(1, '할일 갱신!!');
  });
});
