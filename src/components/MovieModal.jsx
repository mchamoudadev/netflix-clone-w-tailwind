import Modal from "@mui/material/Modal";
import {
	CheckIcon,
	PlayIcon,
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

const MovieModal = () => {
	const [showModal, setShowModal] = useRecoilState(modalState);
	// const [movies, setMovie] = useRecoilState();
	const [movie, setMovie] = useRecoilState(movieState);
	const [key, setKey] = useState("");
	const [muted, setMuted] = useState(false);
	const [playing, setPlaying] = useState(true);

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
			console.log(data.videos);
			if (data?.videos.results.length > 0) {
				setKey(data.videos.results[0].key);
			} else {
				toast.error("This movie does not have a video trailer");
			}
		};
		fetchTrailers();
	}, [movie]);

	return (
		// overiding material ui design
		<Modal
			className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-y-hidden
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
				</div>

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
						<button className="modal-btn">
							<PlusIcon className="h-7 w-7" />
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
			</>
		</Modal>
	);
};

export default MovieModal;
