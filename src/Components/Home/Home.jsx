import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "085aeef34419bcd57854136a0ce67373";
const url = "https://api.themoviedb.org/3/movie/";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => <img className="card" src={img} alt="cover" />;

const Row = ({ title, arr = [] }) => (
  <div className="row">
    <h2>{title}</h2>
    <div>
      {arr.map((item, index) => (
        <Card
          key={index}
          className="row"
          img={`${imgUrl}/${item.poster_path}`}
        />
      ))}
    </div>
  </div>
);

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${upcoming}?api_key=${apiKey}`);
      setUpcomingMovies(results);
    };

    const fetchNowPlaying = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${nowPlaying}?api_key=${apiKey}`);
      setNowPlayingMovies(results);
    };

    const fetchPopular = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${popular}?api_key=${apiKey}`);
      setPopularMovies(results);
    };

    const fetchTopRated = async () => {
      const {
        data: { results },
      } = await axios.get(`${url}/${topRated}?api_key=${apiKey}`);
      setTopRatedMovies(results);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, []);

  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})`
            : "rgb(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            <BiPlay /> Play{" "}
          </button>
          <button>
            My List <AiOutlinePlus />{" "}
          </button>
        </div>
      </div>
      <Row title={"Upcoming Movies"} arr={upcomingMovies} />
      <Row title={"Now Playing Movies"} arr={nowPlayingMovies} />
      <Row title={"Popular Movies"} arr={popularMovies} />
      <Row title={"Top Rated Movies"} arr={topRatedMovies} />
    </section>
  );
};

export default Home;
