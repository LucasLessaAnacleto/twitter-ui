import { newId, tweets } from "../data/tweets";
import { Separator } from "../components/separator";
import { Tweet } from "../components/tweet";
import { getLinkRouterDom } from "../components/use-router-dom";
import { FormEvent, KeyboardEvent, useState } from "react";
import "../styles/tweet-status.css";
import { PaperPlaneRight } from "phosphor-react";
import res from "../data/resolve-path";

interface TweetStatusProps {
    setRouter: (path: string) => void,
    routeParams: { tweetId: string }
}

export function TweetStatus({setRouter, routeParams}: TweetStatusProps) {
    const tweetId = routeParams.tweetId;
    const tweet = tweets.find(tweet => tweet.id === tweetId)!;
    if(!tweet) setRouter("/not-found");
    const Link = getLinkRouterDom(setRouter);

    const [anwers, setAnswers] = useState(() => tweets.filter(tweet => tweet.answerTo === tweetId));
    const [inputValue, setInputValue] = useState("");

    function createNewAnswer(event: FormEvent) {
        event.preventDefault();
        const newTweet = {
            userName: "Lucas Lessa Anacleto",
            userImage: "https://lh3.googleusercontent.com/a/ACg8ocLr883TT42LDoPjOLMrh2wrNJgo61wVf0vykMvKrc2D65VS7vcb=s288-c-no",
            atSign: "@lucas_lessanacleto",
            content: inputValue,
            comentarys: 0,
            retweets: 0,
            likes: 0,
            answerTo: tweetId,
            id: newId()
        };
        tweets.unshift(newTweet);
        setAnswers(tweets.filter(tweet => tweet.answerTo === tweetId));
        setInputValue("");
    }

    function hotKeySubmit(event: KeyboardEvent) {
        if(event.key === "Enter" && (event.ctrlKey || event.metaKey)){
            createNewAnswer(event)
        }
    }

    return (
        <>        
            <Tweet 
                userName={tweet.userName}
                atSign={tweet.atSign}
                userImage={tweet.userImage}
                content={tweet.content}
                comentarys={tweet.comentarys}
                retweets={tweet.retweets}
                likes={tweet.likes}    
            />

            <Separator />

            <form onSubmit={createNewAnswer} className="new-answer-form">
                <label htmlFor="answer-input">
                    <img src="https://lh3.googleusercontent.com/a/ACg8ocLr883TT42LDoPjOLMrh2wrNJgo61wVf0vykMvKrc2D65VS7vcb=s288-c-no" alt="Lucas Lessa" />
                    <textarea 
                        id="answer-input" 
                        placeholder="Tweet your answer?"
                        value={inputValue}
                        onChange={({target}) => {setInputValue(target.value)}} 
                        onKeyDown={hotKeySubmit}
                    />
                </label>
                <button type="submit" disabled={inputValue === ""}>
                    <PaperPlaneRight />
                    <span>Answer</span>
                </button>
            </form>

            {anwers.map((tweet) => {
                return (
                    <Link key={tweet.id} to={res(`/status/${tweet.id}`)}>
                        <Tweet 
                            userName={tweet.userName}
                            atSign={tweet.atSign}
                            userImage={tweet.userImage}
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