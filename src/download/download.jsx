import React from 'react';

export function Download() {
    // declare react state variables
    const [os_type, update_os] = React.useState("macsilicon");
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
                                <SelectVersion version={version} updateVersion={updateVersion} os_type={os_type} />
                                <DownloadButton version={version} os_type={os_type} />
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
                <option value="macsilicon">Mac (Silicon)</option>
                <option value="windows">Windows</option>
            </select>
        </p>
    );
}

function SelectVersion ({version, updateVersion, os_type}) {
    function onChange (updateValue) {
        updateVersion(updateValue.target.value)
    }

    const versionsAvailable = {
        windows: {
            currentVersion: "v1.3.2",
            versionGroups: [
                {
                    sectionName: "1.3",
                    availableVersions: [
                        {
                            updateNum: "v1.3.2",
                            versionName: "World Names",
                            updateNotes: [
                                "tbd",
                                "tbd"
                            ]
                        }, 
                    ]
                }
            ]
        },
        macsilicon: {
            currentVersion: "v1.4.0",
            versionGroups: [
                {
                    sectionName: "1.4",
                    availableVersions: [
                        {
                            updateNum: "v1.4.0",
                            versionName: "The Robotic Update",
                            updateNotes: [
                                "added the glacier biome",
                                "added naturally generating snowmen",
                                "allowed user to mine and build using the mouse",
                                "updated character to be a robot"
                            ]
                        }
                    ]
                },
                {
                    sectionName: "1.3",
                    availableVersions: [
                        {
                            updateNum: "v1.3.2",
                            versionName: "World Names",
                            updateNotes: [
                                "Updated the \"Create World\" screen",
                                "Added the ability to choose a world name",
                            ]
                        },
                        {
                            updateNum: "v1.3.1",
                            versionName: "Universe of Worlds",
                            updateNotes: [
                                "Added the load screen on the menu!",
                                "Added the ability to load different worlds from the load screen"
                            ]
                        },
                        {
                            updateNum: "v1.3.0",
                            versionName: "\"This Gets Interesting\"",
                            updateNotes: [
                                "First Releaseable Version",
                                "Added a Menu",
                                "Added health bar placeholder"
                            ]
                        }
                    ]
                }
            ]
        }
    }

    function getCurVersionString (curVersion, curVersionKey) {
        if (curVersion == curVersionKey){
            return " (current)"
        }
        return ""
    }

    const optionsElements = [];
    const curVersion = versionsAvailable[os_type].currentVersion;
    for (const curVersionGroup of versionsAvailable[os_type].versionGroups) {
        optionsElements.push(
            <optgroup key={curVersionGroup.sectionName} label={curVersionGroup.sectionName}>
                {
                    curVersionGroup.availableVersions.map( version => (
                        <option key={version.updateNum} value={version.updateNum}>{version.updateNum} {getCurVersionString(version.updateNum, curVersion)}</option>
                    ) )
                }
            </optgroup>
        )
    }

    return (
        <p>
            <label className="form-label">Select Game Version</label>
            <select className="form-select" value={version} onChange={onChange}>
                {optionsElements}
            </select>
        </p>
    );
}

function DownloadButton ({version, os_type}) {
    function downloadGame () {
        const file_extention = {
            windows:".zip",
            macsilicon: ".dmg"
        }

        var file_path = "/" + "game_downloads/" + os_type + "/" + version + file_extention[os_type];

        const link = document.createElement("a");
        link.href = file_path;
        link.download = "";
        link.click();
    }

    return (
        <button className="btn btn-primary w-100 mt-3" onClick={downloadGame}>Download</button>
    );
}