// ErrorBoundary.js
import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        // Update state to indicate an error has occurred
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to console
        console.error('Error caught in ErrorBoundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI with a popup or message
            return (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', zIndex: 1000 }}>
                    <h2>Something went wrong</h2>
                    <p>Please try again later.</p>
                </div>
            );
        }

        return this.props.children; 
    }
}

export default ErrorBoundary;
