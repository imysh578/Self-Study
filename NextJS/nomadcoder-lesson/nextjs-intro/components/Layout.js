import NavBar from "./Navbar";

export default function Layout({ children }) {
    return (
        <>
            <NavBar />
            <div>{children}</div>
        </>
    );
}
