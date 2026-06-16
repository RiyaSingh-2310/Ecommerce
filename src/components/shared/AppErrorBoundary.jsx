import { Component } from 'react';
import ErrorState from './ErrorState';

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
          <div className="w-full max-w-lg">
            <ErrorState
              title="Something went wrong"
              message={error?.message || 'This page failed to render. Please try again.'}
              onRetry={this.handleRetry}
            />
          </div>
        </div>
      );
    }

    return children;
  }
}
