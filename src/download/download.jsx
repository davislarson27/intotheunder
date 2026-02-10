import React from 'react';

export function Download() {
    return (
        <main className="py-4 flex-grow-1">
            <div className="container">
                <div className="row g-4">
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4 className="h4 mb-0">Download App</h4>
                            </div>
                            <div className="card-body">
                                <p>
                                    <label className="form-label">Select your computer type:</label>
                                    <select className="form-select">
                                        <option value="mac-silicon">Mac (Silicon)</option>
                                        <option value="windows">Windows</option>
                                    </select>
                                </p>
                                <p>
                                    <label className="form-label">Select Game Version</label>
                                    <select className="form-select">
                                        <optgroup label="1.4">
                                            <option value="v1.4.0">v1.4.0 (current)</option>
                                        </optgroup>
                                        <optgroup label="1.3">
                                            <option value="v1.3.2">v1.3.2</option>
                                            <option value="v1.3.1">v1.3.1</option>
                                            <option value="v1.3.0">v1.3.0</option>    
                                        </optgroup>
                                    </select>
                                </p>
                                <button className="btn btn-primary w-100 mt-3">Download</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4  className="h4 mb-0">Version Release Notes</h4>
                            </div>
                            <div className="card-body">
                                <p><span id="selected_game_version" className="text-muted">v1.4.0</span> <span id="selected_game_version_name">The Arctic Update!</span></p>
                                <ul>
                                    <li>added glacier biome</li>
                                    <li>added naturally generating snowmen</li>
                                    <li>changed key to build blocks to right click</li>
                                    <li>changed key to destroy blocks to left click</li>
                                    <li>added chests</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
