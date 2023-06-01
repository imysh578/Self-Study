import { useRouter } from "next/router";
import Seo from "../components/Seo";
import Link from "next/link";

export default function Home({ results }) {
    const router = useRouter();

    function onClick(id, title) {
        router.push(
            {
                pathname: `/movies/${id}`,
                query: { title },
            },
            `/movies/${id}`
        );
    }

    return (
        <div className="container">
            <Seo title="Home" />
            {results?.map((movie) => (
                <div
                    onClick={() => onClick(movie.id, movie.original_title)}
                    className="movie"
                    key={movie.id}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                    <h4>
                        <Link
                            href={{
                                pathname: `/movies/${movie.id}`,
                                query: { title: movie.original_title },
                            }}
                            as={`/movies/${movie.id}`}
                        >
                            {movie.original_title}
                        </Link>
                    </h4>
                </div>
            ))}

            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie {
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

/**
 * getServerSideProps()
 * : 백엔드단(서버)에서 돌아가는 함수
 * : 이 함수 이름은 변경하면 안됨!
 * : 여기다가 API key를 쓰면 Client 단에서 절대 못보게 됨!
 */
export async function getServerSideProps() {
    const { results } = await (
        await fetch("http://localhost:3000/api/movies")
    ).json();
    // 백엔드에서 영화 리스트를 다 받아오기 전까진 html이 생성 안됨 -> 모든 데이터가 오기 전까지는 흰 화면만 보일 수 있음

    return {
        props: {
            results,
        },
    };
}
