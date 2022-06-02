import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import BASE_IMAGE_URL from "../constants";
import { modalState, movieState } from "../atom/modalAtom";
import { useRecoilState } from "recoil";

const Row = ({ title, url }) => {
	const [movies, setMovies] = useState([]);
	const [isScrolled, setIsScrolled] = useState(false);

	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);

	const rowRef = useRef(null);
	useEffect(() => {
		const fetchMovies = async () => {
			const { data } = await axios.get(url);
			setMovies(data.results);
		};
		fetchMovies();
	}, [url]);

	const handleScroll = (direction) => {
		setIsScrolled(true);
		if (rowRef.current) {
			const { clientWidth, scrollLeft } = rowRef.current;
			const scrollTo =
				direction === "left"
					? scrollLeft - clientWidth
					: scrollLeft + clientWidth;
			rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
		}
	};

	return (
		<div className="h-40">
			<h2 className="text-lg font-semibold ">{title}</h2>
			<div className="group relative md:-ml-2">
				<BiChevronLeft
					onClick={() => handleScroll("left")}
					className={`${
						!isScrolled && "hidden"
					} absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100`}
				/>

				<div
					ref={rowRef}
					className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2">
					{movies.map((movie) => (
						<div
							onClick={() => {
								setShowModal(true);
								setMovie(movie);
							}}
							key={movie.id}
							className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
							<img
								alt=""
								key={movie.id}
								className="cursor-pointer rounded-sm object-cover transition duration-500 md:rounded"
								src={`${BASE_IMAGE_URL}${
									movie.backdrop_path || movie.poster_path
								}`}
							/>
						</div>
					))}
				</div>

				<BiChevronRight
					onClick={() => handleScroll("right")}
					className="absolute top-0 right-2 bottom-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition  group-hover:opacity-100"
				/>
			</div>
		</div>
	);
};

export default Row;
