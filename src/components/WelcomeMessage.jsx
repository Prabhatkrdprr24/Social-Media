const WelcomeMessage = ({onGetPostsClick}) => {
    return (
        <center className="welcome">
            <h1>Nothing In The Post List...</h1>
            <button 
            type="button" 
            className="btn btn-primary"
            onClick = {onGetPostsClick}
            >
            Get Post From Server
            </button>
        </center>
    );
}

export default WelcomeMessage;