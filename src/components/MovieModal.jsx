import {
	collection,
	doc,
	setDoc,
	deleteDoc,
	onSnapshot,
} from "firebase/firestore";
import Modal from "@mui/material/Modal";
import {
	CheckIcon,
	PlusIcon,
	ThumbUpIcon,
	VolumeOffIcon,
	VolumeUpIcon,
	XIcon,
} from "@heroicons/react/solid";

import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atom/modalAtom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { FaPause, FaPlay } from "react-icons/fa";
import { toast } from "react-toastify";
import { db } from "../misc/firebase";
import useAuth from "../context/AuthContext";

const MovieModal = () => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	const [movie, setMovie] = useRecoilState(movieState);
	const [key, setKey] = useState("");
	const [muted, setMuted] = useState(true);
	const [playing, setPlaying] = useState(true);
	const [genres, setGenres] = useState([]);
	const [addedToTheList, setAddedToTheList] = useState(false);
	const { user } = useAuth();
	const [movies, setMovies] = useState([]);

	const handleClose = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const fetchTrailers = async () => {
			const { data } = await axios.get(
				`https://api.themoviedb.org/3/${
					movie?.media_type === "tv" ? "tv" : "movie"
				}/${movie?.id}?api_key=${
					process.env.REACT_APP_API_KEY
				}&language=en-US&append_to_response=videos`
			);
			setGenres(data?.genres);
			if (data?.videos.results.length > 0) {
				setKey(data.videos.results[0].key);
			} else {
				toast.error("This movie does not have a video trailer");
			}
		};
		fetchTrailers();
	}, [movie]);

	// read all user saved list
	useEffect(() => {
		// is lisning the changes you made realtime
		// when you add or remove something from the list then you get callback fires
		// and do whatever you want
		return onSnapshot(
			collection(db, "myList", user.user.uid, "movies"),
			(snap) => setMovies(snap.docs)
		);
	}, [db, movie?.id]);

	// check if the moviee alreday in the list
	useEffect(() => {
		setAddedToTheList(
			movies.findIndex((result) => result.data().id === movie?.id) !== -1
		);
	}, [movies]);

	const addTolist = async () => {
		try {
			// if alreday in the list delete
			if (addedToTheList) {
				await deleteDoc(
					doc(db, "myList", user.user.uid, "movies", movie.id.toString())
				);
				toast.success(
					`${movie.original_title || movie.original_name} removed from the list`
				);
			} else {
				// add now
				await setDoc(
					doc(db, "myList", user.user.uid, "movies", movie.id.toString()),
					{
						...movie,
					}
				);
				toast.success(
					`${movie.original_title || movie.original_name} added to the list`
				);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		// overiding material ui design
		<Modal
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-y-scroll
			rounded-md scrollbar-hide"
			open={showModal}
			onClose={handleClose}>
			<>
				<button
					className="modalButton modal-btn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
					onClick={handleClose}>
					<XIcon className="h-6 w-6" />
				</button>

				<div className="relative pt-[56.24%]">
					<ReactPlayer
						url={`https://www.youtube.com/watch?v=${key}`}
						width="100%"
						height="100%"
						style={{ position: "absolute", top: 0, left: 0 }}
						playing={playing}
						muted={muted}
					/>
					<div className="absolute bottom-10 flex w-full items-center justify-between px-10">
						<div className="flex space-x-2">
							<button
								className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
								onClick={() => setPlaying(!playing)}>
								{playing ? (
									<>
										<FaPause className="h-7 w-7 text-black" />
										Pause
									</>
								) : (
									<>
										<FaPlay className="h-7 w-7 text-black" />
										Play
									</>
								)}
							</button>
							<button className="modal-btn" onClick={addTolist}>
								{addedToTheList ? (
									<CheckIcon className="h-7 w-7" />
								) : (
									<PlusIcon className="h-7 w-7" />
								)}
							</button>
							<button className="modal-btn">
								<ThumbUpIcon className="h-6 w-6" />
							</button>
						</div>
						<button className="modal-btn" onClick={() => setMuted(!muted)}>
							{muted ? (
								<VolumeOffIcon className="h-6 w-6" />
							) : (
								<VolumeUpIcon className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				<div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
					<div className="space-y-6 text-lg">
						<div className="flex items-center space-x-2">
							<p className="font-semibold text-green-400">
								{movie?.vote_average * 10} % Match
							</p>
							<p className="font-light">
								{movie?.release_date || movie?.first_air_date}
							</p>
							<div className="flex h-4 items-center justify-center rounded  border border-white/40 px-1.5 text-xs">
								HD
							</div>
						</div>
						<div className="flex flex-col gap-x-10 gap-y-4 font-light">
							<p className="w-5/6">{movie?.overview}</p>
							<div className="flex flex-col space-y-3 text-sm">
								<div>
									<span className="text-gray-400"> Genres :</span>
									{genres.map((genre) => genre.name).join(", ")}
								</div>
							</div>
							<div>
								<span className="text-gray-400">Original Language : </span>
								{movie?.original_language}
							</div>
							<div>
								<span className="text-gray-400">Total votes : </span>
								{movie?.vote_count}
							</div>
						</div>
					</div>
				</div>
			</>
		</Modal>
	);
};

export default MovieModal;
