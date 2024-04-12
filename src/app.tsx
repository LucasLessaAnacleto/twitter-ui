import "./styles/home.css";
import { Sidebar } from "./components/sidebar";
import { useRouterDom } from "./components/use-router-dom";
import { Timeline } from "./pages/timeline";
import { TweetStatus } from "./pages/tweet-status";
import { NotFound } from "./pages/not-found";
import { Header } from "./components/header";
import res from "./data/resolve-path";


export function App(){
    const [ Router, setCurrentPath, currentPath ] = useRouterDom("/");

    return (
        <div className="layout">
            <Sidebar active={currentPath === res("/") ? "home" : ""} setRouter={setCurrentPath} />
            <main>
                <Header title={currentPath === res("/") ? "Home" : "Tweet"} />
                <Router
                    optionalRouters={[
                    {
                        path: res("/"),
                        element: Timeline,
                        setRouter: setCurrentPath
                    },
                    {
                        path: res("/status/:tweetId"), 
                        element: TweetStatus,
                        setRouter: setCurrentPath, 
                        hasRouteParam: true
                    },
                    // {
                    //     path: "?",
                    //     element: NotFound,     
                    // }
                ]} />
            </main>
        </div>
    )
}