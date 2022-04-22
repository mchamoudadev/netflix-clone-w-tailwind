const FooterLinks = ({ links }) => {
	return (
		<div className='mx-4 my-2 flex flex-col'>
			{links.map((link, index) => (
				<a
					key={index}
					href={`/${link}`}
					className='my-1 text-sm text-[#6c6c6c]'>
					{link}
				</a>
			))}
		</div>
	);
};

export default FooterLinks;
