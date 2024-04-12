const url = new URL(window.location.toString()); 

const config: {path_name_root?: string} = {
    path_name_root: url.host === "localhost:5173" ? 
    "" : // raiz
    "" // define aqui um sub-diretório, caso a sua aplicação não esteja na raiz do servidor
}

export default function resolvePath(path: string) : string {
    return config.path_name_root ? config.path_name_root + path : path;
}