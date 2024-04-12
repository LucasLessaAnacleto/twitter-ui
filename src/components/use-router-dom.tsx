import { ComponentProps, useState } from "react";

type RouterType = (props: RouterProps) => JSX.Element;
type SetRouterType = (path: string) => void;

interface RouterProps{
    optionalRouters: {
        path: string, 
        element: ([key]: any) => JSX.Element,
        setRouter?: SetRouterType,
        hasRouteParam?: boolean,
        props?: {[propName: string]: any}
    }[]
}

function useRouterDom(pathInitial?: string) : [RouterType, SetRouterType, string] {

    const [pathRouter, setPathRouter] = useState(() => {
        const url = new URL(window.location.toString());

        if(url.pathname.length <= 1){
            url.pathname = pathInitial || "/";
            window.history.replaceState({}, "", url); 
        }  

        return url.pathname;
    });

    function setRouter(path: string){

        if(pathRouter !== path){
            const url = new URL(window.location.toString());
            url.pathname = path;

            window.history.replaceState({path}, "", url);

            setPathRouter(path);
        }

    }
    function Router({optionalRouters}: RouterProps) { 

        let routeParameters: RouterParam | undefined = undefined;
        const router = optionalRouters
        .find(router => {
            const [isPathValid, routeParams] = equalPath(pathRouter, router.path) 
            if(isPathValid && router.path !== "?"){
                if(router.hasRouteParam === true) routeParameters = routeParams;
                return true;
            };
            return false;
        });

        if(!!router){
            if(routeParameters !== undefined){
                if (typeof router.element === 'function') {
                    
                    const Element = router.element as React.ComponentType<{ setRouter: any, routeParams: any }>;
                    return <Element 
                        setRouter={router.setRouter} 
                        routeParams={routeParameters} 
                        {...router.props}
                    />;
                }
            }
            return <router.element 
                setRouter={router.setRouter} 
                {...router.props}
            />;

        }else{
            const notFound = optionalRouters.find(router => router.path === "?" );

            if(!!notFound) {

                const url = new URL(window.location.toString());
                url.pathname = "/not-found";
                window.history.replaceState({}, "", url);
                return <notFound.element 
                    setRouter={notFound.setRouter} 
                    {...notFound.props}
                />;

            }
        }
        return <></>
    }
    
    return [Router, setRouter, pathRouter]
}

interface LinkProps extends ComponentProps<"a">{
    to: string | null,
    children: React.ReactNode,
}

function getLinkRouterDom(setPathRouter: SetRouterType) {

    return function Link({to, ...props}: LinkProps) : React.ReactNode {

        return (
            <a {...props} onClick={() => {
                if(to !== null) setPathRouter(to)
            }}>
                {props.children}
            </a>
        )
    }

}

type RouterParam = {
    [key: string]: string;
}
function equalPath(current: string, path: string) : [boolean, RouterParam | undefined]{
    const response: RouterParam = {};
    if(path.includes("/:")){

        const tempCurrent = current.split("/");
        const tempPath = path.split("/");
        if(tempCurrent.length !== tempPath.length) 
            return [false, undefined];

        return [tempPath.every((pathname, index) => {
            if(pathname.match(/^[:]/g)){
                const routeParam = tempCurrent[index];
                const routeNameParam = pathname.replace(/[:]([\S]+)/gui, "$1");
                response[routeNameParam] = routeParam;
                return true
            }else{
                return pathname === tempCurrent[index];
            }
        }), response ]
    }
    return [current === path, undefined];
} 

export { useRouterDom, getLinkRouterDom }

