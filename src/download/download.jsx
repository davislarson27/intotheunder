import React from 'react';

import { updateUserData } from '../service';

export function Download({userData, changeUserData}) {
    // declare react state variables
    const [versionData, updateVersionData] = React.useState (
        {
            windows: {
                currentVersion: "v1.4.0",
                versionGroups: [
                    {
                        sectionName: "1.4",
                        availableVersions: [
                            {
                                updateNum: "v1.4.0",
                                versionName: "Robotic Update",
                                updateNotes: [
                                    "added the glacier biome",
                                    "added naturally generating snowmen",
                                    "allowed user to mine and build using the mouse",
                                    "updated character to be a robot",
                                    "got a new app icon"
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
                                    "updated the \"Create World\" screen",
                                    "added the ability to choose a world name",
                                    "added ability to run on Windows"
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
                                versionName: "Robotic Update",
                                updateNotes: [
                                    "added the glacier biome",
                                    "added naturally generating snowmen",
                                    "allowed user to mine and build using the mouse",
                                    "updated character to be a robot",
                                    "got a new app icon"
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
                                    "updated the \"Create World\" screen",
                                    "added the ability to choose a world name",
                                    "added ability to run on Windows"
                                ]
                            },
                            {
                                updateNum: "v1.3.1",
                                versionName: "Universe of Worlds",
                                updateNotes: [
                                    "added the load screen on the menu!",
                                    "added the ability to load different worlds from the load screen"
                                ]
                            },
                            {
                                updateNum: "v1.3.0",
                                versionName: "Menu",
                                updateNotes: [
                                    "first released Version",
                                    "added a Menu",
                                    "added health bar placeholder"
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    
    )
    const [os_type, update_os] = React.useState("macsilicon");
    const [version, updateVersion] = React.useState("v1.4.0");

    React.useEffect(() => {
        if (userData != null) {
            update_os(userData.lastOSDownloaded);
        }
    }, [userData]); // Run this effect only when userData changes


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
                                <SelectOS os_type={os_type} update_os={update_os} versionData={versionData} updateVersion={updateVersion} />
                                <SelectVersion version={version} updateVersion={updateVersion} os_type={os_type} versionData={versionData} />
                                <DownloadButton version={version} os_type={os_type} userData={userData} changeUserData={changeUserData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4  className="h4 mb-0">Version Release Notes</h4>
                            </div>
                            <UpdateInfoDisplay version={version} os_type={os_type} versionData={versionData}/>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}


function SelectOS ({os_type, update_os, versionData, updateVersion }) {
    function onChange (updateValue) {
        const updatedOs = updateValue.target.value;
        update_os(updatedOs);
        updateVersion(versionData[updatedOs].currentVersion);
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

function SelectVersion ({version, updateVersion, os_type, versionData}) {
    function onChange (updateValue) {
        updateVersion(updateValue.target.value)
    }

    function getCurVersionString (curVersion, curVersionKey) {
        if (curVersion == curVersionKey){
            return " (current)"
        }
        return ""
    }

    const optionsElements = [];
    const curVersion = versionData[os_type].currentVersion;
    for (const curVersionGroup of versionData[os_type].versionGroups) {
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

function DownloadButton ({version, os_type, userData, changeUserData}) {
    function downloadGame () {
        const file_extention = {
            windows:".zip",
            macsilicon: ".dmg"
        }

        const confirmed_download = window.confirm("Are you sure you want to download Into The Under?");
        
        if (confirmed_download){
            var file_path = "/" + "game_downloads/" + os_type + "/" + version + "/IntoTheUnder" + file_extention[os_type];
            const link = document.createElement("a");
            link.href = file_path;
            link.download = "";
            link.click();
            changeUserData(userData => ({
                ...userData,
                ["lastOSDownloaded"]: os_type,
                ["lastVersionDownloaded"] : version
            }));
            updateUserData(userData);
        }
    }

    return (
        <button className="btn btn-primary w-100 mt-3" onClick={downloadGame}>Download</button>
    );
}

function UpdateInfoDisplay ({version, os_type, versionData}) {

    function getUpdateNotes () {
        for (const curVersionGroup of versionData[os_type].versionGroups) {
            for (const curVersion of curVersionGroup.availableVersions) {
                if (curVersion.updateNum == version) {
                    return curVersion.updateNotes;
                }
            }
        }    
    }

    function getVersionName () {
        for (const curVersionGroup of versionData[os_type].versionGroups) {
            for (const curVersion of curVersionGroup.availableVersions) {
                if (curVersion.updateNum == version) {
                    return curVersion.versionName;
                }
            }
        }    
    }

    const cardElements = [];
    // cardElements.push(
    //     <p key={version}><span key={version} className="text-muted">{version} - </span> The {getVersionName()} Update!</p>
    // )

    const updateNotes = getUpdateNotes()
    updateNotes.map(curNote => (
        cardElements.push(<li key={curNote}>{curNote}</li>)
    ))

    return (
        <div className='card-body'>
            <p><span className="text-muted">{version} - </span> The {getVersionName()} Update!</p>
            <ul className="mb-1 ps-3">
                {cardElements}
            </ul>
        </div>
    );
}