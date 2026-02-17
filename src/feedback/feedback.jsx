import React from 'react';

import { likeCommentRequest } from '../service';

export function Feedback({dbComments, updateDbComments, userData, changeUserData}) {

    const [countLoadedComments, updateCountLoadedComments] = React.useState (10);
    const [DEFAULTLOADEDCOMMENTS] = React.useState (10);
    const [loadedComments, updateLoadedComments] = React.useState (dbComments);

    React.useEffect( () => 
        updateLoadedComments(
            dbComments
        ), [dbComments]
    );

    return (
    
        <main className="py-4 flex-grow-1">

            <div className="container">

                <div className="row g-4">
                    <div className="col-12 col-md-8">
                        <h3>Game Update Suggestions</h3>
                        <p className="text-muted">upvote ideas that you like and the developer will see them! please be respectful!</p>
                    </div>
                    < FilterComments 
                        dbComments={dbComments}
                        updateLoadedComments={updateLoadedComments}
                        updateCountLoadedComments={updateCountLoadedComments}
                        DEFAULTLOADEDCOMMENTS={DEFAULTLOADEDCOMMENTS}
                    />
                </div>

                <hr className="mt-4"/>

                <div className="row g-4 mt-1 comment" id="commentNum1">
                    <div className="col-12 col-md-8">
                        {loadedComments.length > 0 ? (
                            <><h4>Top Suggestions:</h4></>
                        ): (
                            <>
                                <h4>No Suggestions Yet</h4>
                                <p>Be the first to give one!</p>
                            </>
                        )
                        }
                        
                    </div>
                </div>
            
            </div>


            <Comments
                comments={loadedComments}
                dbComments={dbComments}
                countLoadedComments={countLoadedComments}
                updateCountLoadedComments={updateCountLoadedComments}
                updateDbComments={updateDbComments}
                DEFAULTLOADEDCOMMENTS={DEFAULTLOADEDCOMMENTS}
            />


            <div className="container">

                <hr className="mt-5"/>

                <div className="row mt-5">
                    <div className="col-12 col-md-8">
                        <AddCommentCard
                            loadedComments={loadedComments}
                            updateLoadedComments={updateLoadedComments}
                        />
                    </div>
                </div>

            </div>


        </main>
    );
}

function FilterComments ({dbComments, updateLoadedComments, updateCountLoadedComments, DEFAULTLOADEDCOMMENTS}) {

    function applyFilter (selectedVersion) { // this will probably call the server to replace the comments at some point
        const filterVersion = selectedVersion.target.value;
        updateCountLoadedComments(DEFAULTLOADEDCOMMENTS);
        if (filterVersion == "all") {
            updateLoadedComments(
                dbComments
            );
        }
        else {
            updateLoadedComments(
                dbComments.filter(comment => comment.commentVersion == filterVersion)
            );    
        }
    }

    return (
        <div className="col-12 col-md-4">
            <div className="card">
                <div className="card-body">
                    <label className="form-label">Filter by Game Version</label>
                    <select className="form-select" onChange={applyFilter}>
                        <optgroup label="all">
                            <option value="all">all versions</option>
                        </optgroup>
                        <optgroup label="v1.4">
                            <option value="v1.4.0">v1.4.0 (current)</option>
                        </optgroup>
                        <optgroup label="1.3">
                            <option value="v1.3.2">v1.3.2</option>
                            <option value="v1.3.1">v1.3.1</option>
                            <option value="v1.3.0">v1.3.0</option>    
                        </optgroup>
                    </select>
                </div>
            </div>
        </div>
    );
}

function Comments ({comments, dbComments, updateDbComments, countLoadedComments, updateCountLoadedComments, DEFAULTLOADEDCOMMENTS}) {

    function loadMoreComments () {
        updateCountLoadedComments (
            countLoadedComments + 5
        );
    }

    function collapseComments () {
        updateCountLoadedComments (
            DEFAULTLOADEDCOMMENTS
        );
    }

    function likeComment (comment) {
        const newLikeValue = !comment.isLikedByUser;
        let newCountofLikes = 0;
        if (newLikeValue) {
            newCountofLikes = comment.likes + 1;
        } else {
            newCountofLikes = comment.likes - 1;
        }
        
        updateDbComments(
            dbComments.map( c => 
                comment.commentID === c.commentID
                ? {...c, isLikedByUser: newLikeValue, likes: newCountofLikes }
                : c
            
    
            )
        )
    
        likeCommentRequest(comment.commentID, newLikeValue); // this won't return anything -> the websocket will rerender if something needs to change
    }

    
    const commentElements = [];
    var i = 0;
    for (const comment of comments) {
        i++;
        if (i > countLoadedComments) {
            break;
        }
        commentElements.push(
            <div key={comment.commentID} className="row g-4 mt-1 comment" id={"commentNum" + comment.commentID}>
                <div className="col-10 col-md-7">
                    <p className="comment"><span className="comment_user">{comment.user}</span> <span className="text-muted">{comment.commentVersion}</span></p>
                    <div className="card">
                        <div className="card-body">
                            <p className="commenet">{comment.commentText}</p>
                        </div>
                    </div>
                </div>
                <div className="col-1 me-2">
                    <div className="full_like_container" style={{padding: "0px"}}>
                        <p className="like_count" style={{marginTop: "1.5em"}}>{comment.likes}</p>
                        <span className="like_button_container" id={"like" + comment.commentID} onClick={() => likeComment(comment)}>
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
            <div className="row g-4 mt-3" id="move_comment_sections_buttons">
                    <div className="col-12 col-md-8">

                        {comments.length > countLoadedComments && (
                            <><button className="btn btn-outline-primary" onClick={loadMoreComments}>Load More Suggestions</button></>
                        )}
                        {comments.length > countLoadedComments && countLoadedComments > DEFAULTLOADEDCOMMENTS && (
                            <><br className="d-block d-lg-none" /></>
                        )}
                        {comments.length > countLoadedComments && countLoadedComments > DEFAULTLOADEDCOMMENTS && (
                            <><button className="btn btn-outline-danger ms-md-3 mt-3 mt-lg-0" onClick={collapseComments}>Collapse Suggestions</button></>
                        )}
                        {comments.length <= countLoadedComments && countLoadedComments > DEFAULTLOADEDCOMMENTS && (
                            <><button className="btn btn-outline-danger" onClick={collapseComments}>Collapse Suggestions</button></>
                        )}

                    </div>
            </div>
        </div>
        
    );
}

function AddCommentCard ({loadedComments, updateLoadedComments}) {
    const [userComment, updateUserComment] = React.useState("");

    function IsValidComment () { // this needs to be done on the server for data safety
        if (userComment.length < 10) {
            alert("Failed to Submit: Suggestions Must Be Longer Than 10 Characters!");
            return false;
        }
        else if (false) {
            // this will check for bad words. download the line below and figure out how to use it.
            // npm install bad-words
            // this part also needs to be done server side so users can't bypass it
            alert("Failed to Submit: This Suggestion Does Not Meet Our Community Standards");
            return false;
        }
        else {
            return true;
        }
    }

    function submitComment () {
        if (IsValidComment()) {
            // this part will probably be replaced by calling the server
            updateLoadedComments(
                [
                    ...loadedComments,
                    {
                        commentID: 90,
                        user: "CurrentUser",
                        commentVersion: "v1.4.0",
                        commentText: userComment,
                        likes: 0
                    }
                ]
            );
            
            // now clear the text bos
            updateUserComment("");

            // alert the user that it succeeded
            alert("Your Suggestion Was Submitted Successfully!");
        }
    }

    function updateTyping (e) {
        var textInput = e.target.value;
        updateUserComment(textInput);
    }

    return (
        <div className="card shadow-sm">
            <div className="card-header">
                <h4>Submit Your Idea!</h4>
            </div>
            <div className="card-body">
                <label htmlFor="user_submission_form" className="form-label">
                    Do you have an idea nobody has shared yet? Share it here!
                </label>
                <textarea onChange={updateTyping} value={userComment} className ="form-control mb-3" id="user_submission_form" label="Submit Your Idea" placeholder="type idea here!" name="user_submission"></textarea>
                <button className="btn btn-primary" type="submit" onClick={submitComment}>Submit Idea!</button>
            </div>

        </div>
    );
}