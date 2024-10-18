import ErrorBoundary from "./../components/ErrorBoundary";

function withErrorBoundary(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  return function ErrorBoundaryHOC(props) {
    return (
      <ErrorBoundary componentName={componentName}>
        <WrappedComponent {...props} />
      </ErrorBoundary>
    );
  };
}

export default withErrorBoundary;
