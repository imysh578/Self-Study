async function fetchRepo(name: string) {
    const response = await fetch(
        `https://api.github.com/repos/imysh578/${name}/`
    );
    const repo = await response.json();
    return repo;
}

export default async function Repo({ name }: { name: string }) {
    const repo = await fetchRepo(name);

    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Repo Details</p>
        </div>
    );
}
