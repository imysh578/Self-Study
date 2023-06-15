import Link from "next/link";

export default function Header() {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link href="/">Home</Link>
                </div>
                <div className="links">
                    <Link href="/about">About</Link>
                    <Link href="/about/team">Our Team</Link>
                    <Link href="/code/repos">Code</Link>
                </div>
            </div>
        </header>
    );
}
