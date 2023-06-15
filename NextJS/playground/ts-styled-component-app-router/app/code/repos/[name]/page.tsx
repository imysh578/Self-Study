import { FC } from "react";

interface RepoPageProps {
    params: {
        name: string;
    };
}

const RepoPage: FC<RepoPageProps> = ({ params: { name } }) => {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Repo Details</p>
        </div>
    );
};

export default RepoPage;
