const Loading = (props) => {
    return props.loading ?
        <div className="loading">
            <span className="loading-text">
                Loading

            </span>
        </div> : ""

}

export default Loading;