import createModel from './model';

describe('옵저버 모델 테스트', () => {
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
