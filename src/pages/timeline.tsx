import { newId, tweets } from "../data/tweets";
import { Separator } from "../components/separator";
import { Tweet } from "../components/tweet";
import { getLinkRouterDom } from "../components/use-router-dom";
import "../styles/timeline.css";
import { FormEvent, useState } from "react";
import res from "../data/resolve-path";


interface TimelineProps {
    setRouter: (path: string) => void
}

export function Timeline({setRouter}: TimelineProps) {
    const [listTweets,] = useState(tweets);
    const [inputValue, setInputValue] = useState("");

    const Link = getLinkRouterDom(setRouter);

    function createNewTweet(event: FormEvent) {
        event.preventDefault();
        const newTweet = {
            userName: "Lucas Lessa Anacleto",
            userImage: "https://lh3.googleusercontent.com/a/ACg8ocLr883TT42LDoPjOLMrh2wrNJgo61wVf0vykMvKrc2D65VS7vcb=s288-c-no",
            atSign: "@lucas_lessanacleto",
            content: inputValue,
            comentarys: 0,
            retweets: 0,
            likes: 0,
            answerTo: null,
            id: newId()
        };
        tweets.unshift(newTweet);
        setInputValue("");
    }

    return (
        <>           
            <form onSubmit={createNewTweet} className="new-tweet-form">
                <label htmlFor="tweet-input">
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocLr883TT42LDoPjOLMrh2wrNJgo61wVf0vykMvKrc2D65VS7vcb=s288-c-no" alt="Lucas Lessa" />
                    <textarea 
                        id="tweet-input" 
                        placeholder="Whats happening?" 
                        onChange={({target}) => setInputValue(target.value)} 
                        value={inputValue}
                    />
                </label>
                <button className="new-tweet" type="submit" disabled={inputValue === ""}>
                    Tweet
                </button>
            </form>

            <Separator />

            {listTweets.map((tweet) => {
                return (
                    <Link key={tweet.id} to={res(`/status/${tweet.id}`)}>
                        <Tweet 
                            userImage={tweet.userImage}
                            userName={tweet.userName}
                            atSign={tweet.atSign}
                            content={tweet.content}
                            comentarys={tweet.comentarys}
                            retweets={tweet.retweets}
                            likes={tweet.likes}
                        />
                    </Link>
                )
            })}
        </>
    )
}