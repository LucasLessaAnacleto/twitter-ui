import '../styles/not-found.css';

export function NotFound() {
    return (
        <div className="not-found">
            <span>
                <h1> Página não encontrada </h1>
                <p>
                    A página não existe ou foi removida do nosso site, por favor clique no botão <strong>Home</strong> no menu ao lado e volte a navegar em nossa página principal.
                </p>
            </span>
        </div>
    )
}