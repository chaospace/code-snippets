import { PropsWithChildren } from 'react';

function FormFeedbackBoundary(props: PropsWithChildren<{}>) {
  const { children, ...rest } = props;
  return (
    <div>
      <span>aa</span>
      { children }
    </div>
  );
}

export default FormFeedbackBoundary;
