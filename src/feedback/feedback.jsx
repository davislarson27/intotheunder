import React from 'react';

export function Feedback() {
    const [comments, updateComments] = React.useState (
        [
            {
                user: "",
                commentVersion: "v1.4.0",
                commentText: "The game is cool but crafting unique blocks would make it even better",
                likes: 87
            }
        ]
    )
    return (
    
        <main className="py-4 flex-grow-1">

            <div className="container">

                <div className="row g-4">
                    <div className="col-12 col-md-8">
                        <h3>Game Update Suggestions</h3>
                        <p className="text-muted">upvote ideas that you like and the developer will see them! please be respectful!</p>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <label className="form-label">Filter by Game Version</label>
                                <select className="form-select">
                                    <optgroup label="all">
                                        <option>all versions</option>
                                    </optgroup>
                                    <optgroup label="v1.4">
                                        <option>v1.4.0 (current)</option>
                                    </optgroup>
                                    <optgroup label="1.3">
                                        <option>v1.3.2</option>
                                        <option>v1.3.1</option>
                                        <option>v1.3.0</option>    
                                    </optgroup>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="mt-4"/>

                <div className="row g-4 mt-1 comment" id="commentNum1">
                    <div className="col-12 col-md-8">
                        <h4>Top Suggestions:</h4>
                    </div>
                </div>

                <div className="row g-4 mt-1 comment" id="commentNum1">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">BestUserNameEver</span> <span className="text-muted">v1.4.0</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">The game is cool but crafting unique blocks would make it even better</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding : "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>87</p>
                            <span className="like_button_container" id="like_1">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>    
                    </div>
                </div>
                <div className="row g-4 mt-1 comment" id="commentNum2">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">JimTheThird</span> <span className="text-muted">v1.4.0</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">We should let us remove stuff from our inventory or throw it out</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>62</p>
                            <span className="like_button_container" id="like_2">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>
                    </div>

                </div>
                <div className="row g-4 mt-1 comment" id="commentNum3">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">CrazyDave67</span> <span className="text-muted">v1.3.2</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">I wish that we had chests in the game</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>23</p>
                            <span className="like_button_container" id="like_3">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>    
                    </div>
                </div>
                <div className="row g-4 mt-1 comment" id="commentNum4">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">McDonaldsLover</span> <span className="text-muted">v1.4.0</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">Increase the build height limit!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_4">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row g-4 mt-1 comment" id="commentNum5">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">JoseTheGOAT</span> <span className="text-muted">v1.4.0</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">A background would be so cool! Maybe like in Terraria.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_5">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row g-4 mt-1 comment" id="commentNum6">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">McDonaldsLover</span> <span className="text-muted">v1.3.1</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">Ok imagine this. Right now the insides of buildings look off because they don't have backgrounds. Imagine if they had a way to add blocks as a wall that made it look more like you were inside! I would be so down for that. Then we wouldn't have to dig out the ground to build tall stuff!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_6">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row g-4 mt-1 comment" id="commentNum7">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">Johnny123</span> <span className="text-muted">v1.3.0</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">Doors please?</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_7">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>    
                    </div>
                </div>
                <div className="row g-4 mt-1 comment" id="commentNum8">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">rambo2.0</span> <span className="text-muted">v1.3.1</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">Please make swimming mechanics more consistent!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_8">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row g-4 mt-1 comment" id="commentNum9">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">WhatAUser111</span> <span className="text-muted">v1.3.1</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">Ladders would be so nice</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_9">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>    
                    </div>
                </div>

                <div className="row g-4 mt-1 comment" id="commentNum10">
                    <div className="col-10 col-md-7">
                        <p className="comment"><span className="comment_user">MegaBatman</span> <span className="text-muted">v1.4.0</span></p>
                        <div className="card">
                            <div className="card-body">
                                <p className="commenet">Please add the ability to take damage!</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 me-2">
                        <div className="full_like_container" style={{padding: "0px"}}>
                            <p className="like_count" style={{marginTop: "1.5em"}}>17</p>
                            <span className="like_button_container" id="like_10">
                                <span className="material-icons-outlined like_button">thumb_up</span>
                            </span>
                        </div>    
                    </div>
                </div>



                <div className="row g-4 mt-3" id="move_comment_sections_buttons">
                    <div className="col-12 col-md-8">
                        <button className="btn btn-outline-primary">Load More Comments</button>
                    </div>
                </div>

                <hr className="mt-5"/>

                <div className="row mt-5">
                    <div className="col-12 col-md-8">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h4>Submit Your Idea!</h4>
                            </div>
                            <form className="card-body" action="feedback.html">
                                <label htmlFor="user_submission_form" className="form-label">
                                    Do you have an idea nobody has shared yet? Share it here!
                                </label>
                                <textarea className ="form-control mb-3" id="user_submission_form" label="Submit Your Idea" placeholder="type idea here!" name="user_submission" required></textarea>
                                <button className="btn btn-primary" type="submit">Submit Idea!</button>
                            </form>

                        </div>
                    </div>
                </div>




            </div>


        </main>
    );
}
