import Link from "next/link";
import { FaStar, FaCodeBranch, FaEye } from "react-icons/fa";

async function fetchRepos() {
    const response = await fetch(
        "https://api.github.com/users/imysh578/repos",
        {
            next: {
                revalidate: 60,
            },
        }
    );

    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second

    const repos = await response.json();
    return repos;
}

interface Repo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    watchers_count: number;
}

const ReposPage = async () => {
    const repos = await fetchRepos();

    return (
        <div className="repos-container">
            <h2>Repositories</h2>
            <ul className="repo-list">
                {repos.map((repo: Repo) => (
                    <li key={repo.id}>
                        <Link href={`/code/repos/${repo.name}`}>
                            <h3>{repo.name}</h3>
                            <p>{repo.description}</p>
                            <div className="repo-details">
                                <span>
                                    <FaStar /> {repo.stargazers_count}
                                </span>
                                <span>
                                    <FaCodeBranch /> {repo.forks_count}
                                </span>
                                <span>
                                    <FaEye /> {repo.watchers_count}
                                </span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default ReposPage;
