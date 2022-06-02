import { Helmet } from 'react-helmet';
import Banner from '../components/Banner';
import Header from '../components/browse/Header';
import MovieModal from '../components/MovieModal';
import Row from '../components/Row';
import requests from '../request';

const Browse = () => {
    return (
        <>
            <Helmet>
                <title>Netflix | Browse</title>
                <meta name="description" content="browse page" />
            </Helmet>
            <div className="relative h-screen lg:h-[140vh] bg-gradient-to-b">
                <Header />
                <main className="relative pl-4 lg:pl-10 space-y-24">
                    <Banner url={requests.fetchNetflixOriginals} />
                    <Row title="Tranding Now" url={requests.fetchTrending} />
                    <Row title="Actions Movies" url={requests.fetchActionMovies} />
                    <Row title="Top Rated" url={requests.fetchTopRated} />
                    <Row title="Romance Moviews" url={requests.fetchRomanceMovies} />
                    <Row title="Horror Movies" url={requests.fetchHorrorMovies} />
                    <Row title="Documantaries" url={requests.fetchDocumantaries} />
                    <Row title="Comedy Movies" url={requests.fetchComedyMovies} />
                </main>

            </div>

            <MovieModal />
        </>
    );
};

export default Browse;