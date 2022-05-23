import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      console.log("ErrorBoundary: getDerivedStateFromError");
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting service
      //logErrorToMyService(error, errorInfo);
    }
  
    render() {
      console.log("ErrorBoundary: getDerivedStateFromError");
      if (this.state.hasError) {
        return <div>Something went wrong.</div>;
      }
  
      return this.props.children; 
    }
  }

  export default ErrorBoundary;