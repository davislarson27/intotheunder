import React from 'react';

export function NotFound() { 
    return (
        <main className="flex-grow-1 text-center">
            <div className="card m-1 m-md-5">
                <div className="card-header">
                    <h3>404 Error</h3>
                </div>
                <div className="card-body">
                    <p>Return to sender. Address unknown.</p>
                </div>
            </div>
        </main>
    );
}
