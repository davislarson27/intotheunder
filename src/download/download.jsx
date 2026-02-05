import React from 'react';

export function Download() {
  return (
    <main class="py-4 flex-grow-1">
        <div class="container">
            <div class="row g-4">
                <div class="col-12 col-md-6">
                    <div class="card shadow-sm">
                        <div class="card-header">
                            <h4 class="h4 mb-0">Download App</h4>
                        </div>
                        <div class="card-body">
                            <p>
                                <label class="form-label">Select your computer type:</label>
                                <select class="form-select">
                                    <option>Mac (Silicon)</option>
                                    <option>Windows</option>
                                </select>
                            </p>
                            <p>
                                <label class="form-label">Select Game Version</label>
                                <select class="form-select">
                                    <optgroup label="1.4">
                                        <option>v1.4.0 (current)</option>
                                    </optgroup>
                                    <optgroup label="1.3">
                                        <option>v1.3.2</option>
                                        <option>v1.3.1</option>
                                        <option>v1.3.0</option>    
                                    </optgroup>
                                </select>
                            </p>
                            <button class="btn btn-primary w-100 mt-3">Download</button>
                        </div>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="card shadow-sm">
                        <div class="card-header">
                            <h4  class="h4 mb-0">Version Release Notes</h4>
                        </div>
                        <div class="card-body">
                            <p><span id="selected_game_version" class="text-muted">v1.4.0</span> <span id="selected_game_version_name">The Arctic Update!</span></p>
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
