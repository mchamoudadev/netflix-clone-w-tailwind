import { collection, deleteDoc, doc, onSnapshot } from "@firebase/firestore";
import { CheckCircleIcon, CheckIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BASE_IMAGE_URL from "../constants";
import useAuth from "../context/AuthContext";
import { db } from "../misc/firebase";
import Header from "./browse/Header";

const MyList = () => {
	const [list, setList] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		return onSnapshot(
			collection(db, "myList", user.user.uid, "movies"),
			(snapshot) => {
				setList(
					snapshot.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))
				);
			}
		);
	}, [db, user]);

	const handleRemove = async (movie) => {
		await deleteDoc(
			doc(db, "myList", user.user.uid, "movies", movie.id.toString())
		);
		toast.success(
			`${movie.original_title || movie.original_name} removed from the list`
		);
	};

	return (
		<>
			<Header />
			<div className="container mx-auto my-28">
				<span className="mb-28 text-2xl font-bold">My List</span>
				<div className="my-10 grid grid-cols-3 space-y-4 space-x-0.5 md:space-x-2.5 md:p-2">
					{list.map((movie) => (
						<div
							key={movie.id}
							className="group  relative cursor-pointer transition duration-200  ease-out md:hover:z-50 md:hover:scale-[1.1]">
							<img
								alt=""
								key={movie.id}
								className="cursor-pointer rounded-sm object-cover transition duration-500 md:rounded"
								src={`${BASE_IMAGE_URL}${
									movie.backdrop_path || movie.poster_path
								}`}
							/>
							<div className="hidden space-x-16 rounded-b-md bg-[#181818] px-10 py-8 group-hover:flex">
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
										<div
											className="modal-btn"
											onClick={() => handleRemove(movie)}>
											<XIcon className="h-7 w-7" />
										</div>
									</div>
									<div className="flex flex-col gap-x-10 gap-y-4 font-light">
										<div>
											<span className="text-gray-400">
												Original Language :{" "}
											</span>
											{movie?.original_language}
										</div>
										<div>
											<span className="text-gray-400">Total votes : </span>
											{movie?.vote_count}
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default MyList;
