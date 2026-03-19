import React from 'react';
import { NavLink } from "react-router-dom";

export function Home() {

    const [lastUpdateGitHub, setLastUpdateGitHub] = React.useState ("...loading...");

    function processDateString (response) {
        if (response?.status === 200) {
            response.json().then( body => {
                const lastUpdateDate = new Date(body[0].commit.author.date);

                const month = lastUpdateDate.getMonth() + 1;
                const day = lastUpdateDate.getDate();
                const year = lastUpdateDate.getFullYear().toString().slice(-2);
    
                const displayDateString = `${month}/${day}/${year}`;
    
                setLastUpdateGitHub(displayDateString);    
            });
        }
    }

    React.useEffect(() => {
        fetch('https://api.github.com/repos/davislarson27/IntoTheUnder-App/commits?per_page=1').then(
            response => processDateString(response)
        )
    }, []);

    return (
        
        <main className="py-4 flex-grow-1">

            <div className="container">
                <div className="row g-5 d-flex justify-content-center align-items-center" id="primary_main_box">
                    <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                        <img className="card-img-top" src="intotheunder_logo.PNG" alt="Into The Under Logo" id="main_logo"/>
                    </div>
                    <div className="col-12 col-md-6 hero_text">
                        <p>Explore New Worlds</p>
                        <p>Mine to the Depths!</p>
                        <h3>Are You Ready to Enter?</h3>
                        <br className="my-3"/>
                        <NavLink to="/download" className="btn btn-primary">Download Now!</NavLink>
                    </div>
                </div>

                <div className="row spacing_row"></div>

                <div className="row g-5 m-4 mt-5">
                    <div className="col-12 col-md-6">
                        <div className="card featured_image">
                            <img className="card-img-top img-fluid rounded" src="itu_forest_biome.png" alt="photo of gameplay"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6  d-flex align-items-center">
                        <div className="featured_text">
                            <h5>What is Into The Under?</h5>
                            <p className="text-muted">
                                Into the Under is a single player block based game meant to bring you into an alien world! 
                                Each 2D world is unique! As a robot sent from another planet, you will be tasked with saving it from an unsettling, dark force!
                            </p>
                            <p className="text-muted">
                                It will require creativity, but you will find out how to protect yourself and enter INTO THE UNDER and save the world!
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row g-5 m-4 mt-5">
                    <div className="col-12 col-md-6  d-flex align-items-center">
                        <div className="featured_text">
                            <h5>What Can I Do?</h5>
                            <p className="text-muted">
                                You can do anything you want! From building structures to mining for rare blocks, it is up to you!
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card featured_image">
                            <img className="card-img-top img-fluid rounded" src="itu_desert_biome_img.png" alt="photo of gameplay"/>
                        </div>
                    </div>
                </div>

                <div className="row g-5 m-4 mt-5">
                    <div className="col-12 col-md-6">
                        <div className="card featured_image">
                            <img className="card-img-top img-fluid rounded" src="itu_homescreen_screenshot.png" alt="photo of gameplay"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6  d-flex align-items-center">
                        <div className="featured_text">
                            <h5>What is the Goal of the Game?</h5>
                            <p className="text-muted">
                                Into The Under is still under development, so for now it's to explore the world and build cool things!
                            </p>
                            <p className="text-muted">
                                But when the end game update comes... you'll know.
                            </p>

                        </div>
                    </div>
                </div>

                <div className="row g-5 m-4 mt-5">
                    <div className="col-12 col-md-6  d-flex align-items-center">
                        <div className="featured_text">
                            <h5>Is Each World Unique?</h5>
                            <p className="text-muted">
                                Each world is its own unique world! When you create a new world, the game uses procedural generation to make a world unique to you!
                            </p>
                            <p className="text-muted">
                                In the game, you can explore common biomes like forests and deserts, all the while searching for rare biomes like glaciers and lakes! And you never know what's beneath you...
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="card featured_image">
                            <img className="card-img-top img-fluid rounded" src="itu_create_new_world_lake_img.png" alt="photo of gameplay"/>
                        </div>
                    </div>
                </div>

                <div className="row g-5 m-4 mt-5">
                    <div className="col-12 col-md-6">
                        <div className="card featured_image">
                            <img className="card-img-top img-fluid rounded" src="itu_gameplay_image_glacier.png" alt="photo of gameplay"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6  d-flex align-items-center">
                        <div className="featured_text">
                            <h5>Is ITU Receiving Active Updates?</h5>
                            <p className="text-muted">
                                Yes! We have a lot of features we want to add! But to be more specific we last saved some new code for the next big update on {lastUpdateGitHub}!
                            </p>
                            <p className="text-muted">
                                Experence the changes for yourself and participate in the community in the suggestions page!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </main>

    );
}
