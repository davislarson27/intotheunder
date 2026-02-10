import React from 'react';

export function Download() {
    // declare react state variables
    const [os_type, update_os] = React.useState("mac-silicon");
    const [version, updateVersion] = React.useState("v1.4.0");

    // main return value
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
                                <SelectOS os_type={os_type} update_os={update_os} />
                                <SelectVersion version={version} updateVersion={updateVersion}/>
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


function SelectOS ({os_type, update_os}) {
    function onChange (updateValue) {
        update_os(updateValue.target.value)
    }

    return (
        <p>
            <label className="form-label">Select your computer type:</label>
            <select className="form-select" value={os_type} onChange={onChange}>
                <option value="mac-silicon">Mac (Silicon)</option>
                <option value="windows">Windows</option>
            </select>
        </p>
    );
}

function SelectVersion ({version, updateVersion}) {
    function onChange (updateValue) {
        updateVersion(updateValue.target.value)
    }

    return (
        <p>
            <label className="form-label">Select Game Version</label>
            <select className="form-select" value={version} onChange={onChange}>
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
    );
}