import { House, Hash, Bell, Envelope, BookmarkSimple, FileText, User, DotsThreeCircle, Pencil } from "phosphor-react";
import { LogoTwitter } from "../assets/logo-twitter";

import "../styles/sidebar.css";
import { getLinkRouterDom } from "./use-router-dom";
import res from "../data/resolve-path";

interface SidebarProps{
    active: string,
    setRouter: (path: string) => void
}

export function Sidebar({setRouter, active}: SidebarProps) {
    const Link = getLinkRouterDom(setRouter);
    
    return (
        <aside>
                <LogoTwitter className="logo-twitter" width={32} height={32} />
                <nav className="main-navigation">
                    <Link className={active === "home" ? "active" : undefined} to={active === "home" ? null : res("/")} >
                        <House weight={active === "home" ? "fill" : undefined}/>
                        <span>Home</span>
                    </Link>
                    <a>
                        <Hash/>
                        <span>Explore</span>
                    </a>
                    <a>
                        <Bell />
                        <span>Notifications</span>
                    </a>
                    <a>
                        <Envelope />
                        <span>Messages</span>
                    </a>
                    <a>
                        <BookmarkSimple />
                        <span>Bookmarks</span>
                    </a>
                    <a>
                        <FileText />
                        <span>Lists</span>    
                    </a>
                    <a>
                        <User />
                        <span>Profile</span>
                    </a>
                    <a>
                        <DotsThreeCircle />
                        <span>More</span>
                    </a>
                </nav>
                <button className="new-tweet">
                    <Pencil />
                    <span>Tweet</span>
                </button>
            </aside>
    )
}