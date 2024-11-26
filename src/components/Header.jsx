import { NavLink } from "react-router"

export const Header = () => {
    return <>
        <header className="h-24 p-5 flex items-center border-b mb-4">
            <div className="h-full mr-5">
                <img src="/logo-imss.svg" alt="" className="h-full" />
            </div>
            <NavLink to='/' className="text-xl font-bold">
                Clasificador Triage
            </NavLink>
        </header>
    </>
}