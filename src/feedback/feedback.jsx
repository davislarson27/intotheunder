import React from 'react';

export function Feedback() {
    const [comments, updateComments] = React.useState (
        [
            {
                user: "BestUserNameEver",
                commentVersion: "v1.4.0",
                commentText: "The game is cool but crafting unique blocks would make it even better",
                likes: 87
            },
            {
                user: "JimTheThird",
                commentVersion: "v1.4.0",
                commentText: "We should let us remove stuff from our inventory or throw it out",
                likes: 62
            },
            {
                user: "CrazyDave67",
                commentVersion: "v1.3.2",
                commentText: "I wish that we had chests in the game",
                likes: 26
            },
            {
                user: "McDonaldsLover",
                commentVersion: "v1.4.0",
                commentText: "Increase the build height limit!",
                likes: 17
            },
            {
                user: "JoseTheGOAT",
                commentVersion: "v1.4.0",
                commentText: "A background would be so cool! Maybe like in Terraria.",
                likes: 17
            },
            {
                user: "McDonaldsLover",
                commentVersion: "v1.3.1",
                commentText: "Ok imagine this. Right now the insides of buildings look off because they don't have backgrounds. Imagine if they had a way to add blocks as a wall that made it look more like you were inside! I would be so down for that. Then we wouldn't have to dig out the ground to build tall stuff!",
                likes: 14
            },
            {
                user: "Johnny123",
                commentVersion: "v1.3.0",
                commentText: "Doors please?",
                likes: 11
            },
            {
                user: "rambo2.0",
                commentVersion: "v1.3.1",
                commentText: "Please make swimming mechanics more consistent!",
                likes: 9
            },
            {
                user: "WhatAUser111",
                commentVersion: "v1.3.1",
                commentText: "Ladders would be so nice",
                likes: 5
            },
            {
                user: "MegaBatman",
                commentVersion: "v1.4.0",
                commentText: "Please add the ability to take damage!",
                likes: 2
            },
            {
                user: "SomeoneCool",
                commentVersion: "v1.4.0",
                commentText: "Here's some bad advice",
                likes: 1
            },
            {
                user: "User123",
                commentVersion: "v1.4.0",
                commentText: "I like cheese",
                likes: 0
            },
            {
                user: "TheFakeJimmer",
                commentVersion: "v1.4.0",
                commentText: "you should add the whole energy bar thing",
                likes: 0
            },

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
            
            </div>

            
            <Comments comments={comments} updateComments={updateComments} />


            <div className="container">
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

function Comments ({comments}) {
    
    const commentElements = [];
    for (const comment of comments) {
        commentElements.push(
            <div className="row g-4 mt-1 comment" id="commentNum9">
                <div className="col-10 col-md-7">
                    <p className="comment"><span key={comment.user} className="comment_user">{comment.user}</span> <span key={comment.commentVersion} className="text-muted">{comment.commentVersion}</span></p>
                    <div className="card">
                        <div className="card-body">
                            <p key={comment.commentText} className="commenet">{comment.commentText}</p>
                        </div>
                    </div>
                </div>
                <div className="col-1 me-2">
                    <div className="full_like_container" style={{padding: "0px"}}>
                        <p key={comment.likes} className="like_count" style={{marginTop: "1.5em"}}>{comment.likes}</p>
                        <span className="like_button_container" id="like_9">
                            <span className="material-icons-outlined like_button">thumb_up</span>
                        </span>
                    </div>    
                </div>
            </div>
        )
    }

    return (
        <div className="container">
            {commentElements}
        </div>
        
    );
}