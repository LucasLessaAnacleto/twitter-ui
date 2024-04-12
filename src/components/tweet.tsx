import { ComponentProps } from "react";
import { ArrowsClockwise, ChatCircle, Heart } from "phosphor-react";
import { HashTag } from "./hash-tag";
import "../styles/tweet.css";

interface TweetProps extends ComponentProps<"div">{
    userImage: string,
    userName: string,
    atSign: string,
    content: string,
    likes?: number,
    retweets?: number,
    comentarys?: number 
}

export function Tweet({userImage, userName, atSign, content, likes, retweets, comentarys,...props}: TweetProps){

    let phrases = content
    .replace(/[\s][#]([\S]+)/gmui, " ££¬$1¬££ ¬")
    .split(/[£]{2}([\S]+)[£]{2}/gmui)

    return (
        <div {...props} className="tweet">
            <img 
                src={userImage} 
                alt="foto do usuário" 
            />
            <article>  
                <div className="tweet-content">
                    <div className="tweet-profile">
                        <span className="tweet-username">{userName}</span>
                        <span className="tweet-atsign">{atSign?.toLocaleLowerCase("pt-BR")}</span>
                    </div>

                    <p> 
                        {phrases.map(phrase => {
                            if(phrase.match(/^[¬](\S+)[¬]$/gmui)){
                                return <HashTag tag={phrase.replace(/^[¬](\S+)[¬]$/gmui,"$1")}/>
                            }if(phrase.match(/^[\s][¬]/gmui)){
                                return phrase.replace(/^[\s][¬]/gmui, "")
                            }
                            return phrase;
                        })}
                    </p>
                </div>

                <div className="tweet-interaction">

                    <TweetIcon numbers={comentarys} className="tweet-icon-comentary">
                        <ChatCircle />
                    </TweetIcon>

                    <TweetIcon numbers={retweets} className="tweet-icon-retweet">
                        <ArrowsClockwise />
                    </TweetIcon>

                    <TweetIcon numbers={likes} className="tweet-icon-like">
                        <Heart />
                    </TweetIcon>
                </div>
            </article>

            
        </div>
    )
}

interface TweetIconProps extends ComponentProps<"button">{
    numbers?: number,
}

function TweetIcon({children, numbers, ...props}: TweetIconProps) {
    return (
        <button {...props}>
            <span className="sob-icon">
                {children}
                <div className="icon-hover"></div>
            </span>                  
            {numbers || ""}
        </button>
    )
}