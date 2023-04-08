import {PropsWithChildren} from 'react';

type FormValidationProps = {
  validate: (value: string) => boolean;
  pattern?: string;
  required?: boolean;
};

type FormFeedbackProps = {
  message?: string;
  rule?: (name: string, options: FormFeedbackProps) => any;
};

function FormFeedbackBoundary(props: PropsWithChildren<{}>) {
  const {children, ...rest} = props;
  return (
    <div>
      <span>aa</span>
      {children}
    </div>
  );
}

export default FormFeedbackBoundary;
