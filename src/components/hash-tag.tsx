import "../styles/hashtag.css";

export function HashTag(props: {tag: string}){
    return (
        <a className="tweet-hashtag">
            #{props.tag}
        </a>
    )
}