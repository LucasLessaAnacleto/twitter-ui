import { Sparkle } from "phosphor-react";
import "../styles/header.css";

export function Header(props: {title: string}){
    return (
        <div className="timeline-header">
            {props.title}
            <Sparkle />
        </div>
    )
}