import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  // Update state when an error occurs
  static getDerivedStateFromError(error) {
    return { error, hasError: true };
  }

  // Log the error if needed
  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>Snap 😢!. Something went wrong in {this.props.componentName}.</h2>
        </div>
      );
    }

    // If no error, render the child component
    return this.props.children;
  }
}

export default ErrorBoundary;
