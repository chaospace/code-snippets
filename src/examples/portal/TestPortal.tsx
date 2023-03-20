import Input from '@/ui/styled/form/Input';
import {useCallback, useState} from 'react';

const PortalTestArea = () => {
  const [feedbackArea, setFeedbackArea] = useState<HTMLElement | undefined>(undefined);
  const feedbackRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setFeedbackArea(node);
      return node;
    }
  }, []);

  return (
    <>
      <Input
        label="ref테스트"
        name="user_name"
        className="invalid"
        style={{
          flexDirection: 'row',
          borderColor: 'orange'
        }}
        feedbackPortalElement={feedbackArea}
      />
      <span style={{marginLeft: '70px'}} ref={feedbackRef}></span>
    </>
  );
};

export default PortalTestArea;
