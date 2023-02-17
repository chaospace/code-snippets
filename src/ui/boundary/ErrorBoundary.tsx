import {Component, ErrorInfo, ReactNode} from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode | ((props: ErrorBoundaryState) => ReactNode);
}

interface ErrorBoundaryState {
  error?: Error;
  errorInfo?: ErrorInfo;
}

interface FallbackVO extends ErrorBoundaryState {
  reset: () => void;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {error: undefined, errorInfo: undefined};
  }

  reset() {
    this.setState({error: undefined, errorInfo: undefined});
  }

  // static getDerivedStateFromError(error: Error) {
  //   return {error, errorInfo: 'getDerivedStateFromError'};
  // }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({error, errorInfo});
  }

  render(): ReactNode {
    if (this.state.error) {
      const resetHandler = this.reset.bind(this);
      // fallback이 있는 경우 fallback실행
      if (this.props.fallback !== undefined) {
        //this.setState({error: undefined, errorInfo: undefined});
        return typeof this.props.fallback === 'function'
          ? (this.props.fallback as Function).call(null, {
              ...this.state,
              reset: () => this.reset()
            })
          : this.props.fallback;
      }
    }
    return this.props.children;
  }
}

export {FallbackVO};
export default ErrorBoundary;
