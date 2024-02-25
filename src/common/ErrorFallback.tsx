import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import React from 'react';
import { useLocation } from 'react-router-dom';

const ErrorComponent = ({ error }: FallbackProps) => {
  return (
    <div style={{ paddingLeft: '10px' }}>
      <h2>Something went wrong!!! {error}</h2>
    </div>
  );
};

const ErrorFallback = ({ children }: { children: React.ReactElement }) => {
  const { pathname } = useLocation();
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent} resetKeys={[pathname]}>
      {children}
    </ErrorBoundary>
  );
};

export default ErrorFallback;
