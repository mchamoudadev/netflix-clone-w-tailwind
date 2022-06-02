import { useState, useEffect } from "react";
import axios from "axios";
import BASE_IMAGE_URL from "../constants";
import { MdInfo, MdPlayArrow } from "react-icons/md";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atom/modalAtom";

const Banner = ({ url }) => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);

	const [tranding, setTranding] = useState([]);
	useEffect(() => {
		const fetchMovies = async () => {
			const { data } = await axios.get(url);
			setTranding(
				data.results[Math.floor(Math.random() * data.results.length)]
			);
		};
		fetchMovies();
	}, [url]);

	// to cut the long description
	const truncate = (str, max, suffix) =>
		str.length < max
			? str
			: `${str.substr(
					0,
					str.substr(0, max - suffix.length).lastIndexOf(" ")
			  )}${suffix}`;

	return (
		<div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
			<div className="absolute top-0 left-0 -z-10 h-[95vh] w-screen  ">
				<img
					src={`${BASE_IMAGE_URL}${
						tranding.backdrop_path || tranding.poster_path
					}`}
					alt=""
					className="h-screen w-screen object-cover"
				/>
			</div>

			<h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
				{/* sometimes you don't get one of these so use ||  */}
				{tranding.title || tranding.name || tranding.original_name}
			</h1>
			<p className="max-w-xs text-sm md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
				{tranding.overview && truncate(tranding.overview, 200, "...")}
			</p>
			<div className="flex items-center space-x-2">
				<button
					className="flex items-center rounded bg-white px-5 py-1 text-black transition hover:bg-gray-200 md:px-7 md:py-2 md:text-lg"
					onClick={() => {
						setShowModal(true);
						setMovie(tranding);
					}}>
					<MdPlayArrow className="mx-2 h-6 w-6 md:h-8 md:w-8" />
					Play
				</button>
				<button
					className="flex items-center rounded bg-[#5a7272] px-5 py-1 hover:bg-[#718a8a] md:px-7 md:py-2 md:text-lg"
					onClick={() => {
						setShowModal(true);
						setMovie(tranding);
					}}>
					<MdInfo className="mx-2  h-6 w-6 md:h-8 md:w-8" /> More Info
				</button>
			</div>
		</div>
	);
};

export default Banner;
