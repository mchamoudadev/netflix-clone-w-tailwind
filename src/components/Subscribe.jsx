import { MdKeyboardArrowRight } from 'react-icons/md';

const Subscribe = () => {
	return (
		<div className='mx-auto  flex max-w-[600px] flex-col'>
			<p className='my-4 text-center text-lg'>
				Ready to watch? Enter your email to create or restart your membership.
			</p>
			<div className='m-2 flex  flex-col  sm:flex-row sm:space-y-0 '>
				<input
					type='text'
					placeholder='Email address'
					className='mx-auto w-[95%] px-2 py-5 text-black outline-none sm:w-full sm:min-w-[400px] sm:px-5'
				/>

				<button className='mx-auto flex w-[95%] items-center justify-center bg-[#e50914] py-4 text-2xl sm:w-full'>
					Get Started
					<MdKeyboardArrowRight className='h-8 w-8' />
				</button>
			</div>
		</div>
	);
};

export default Subscribe;
