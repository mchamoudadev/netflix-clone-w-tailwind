import FooterLinks from './FooterLinks';
import footerLinksData from '../../content/footerLinks';

const Footer = () => {
	return (
		<div className='mt-10 mb-16 sm:mx-auto sm:max-w-screen-lg'>
			<h1 className='text-[#6c6c6c]'>Questions? Contact us.</h1>
			<div className='mx-10 grid grid-cols-2 sm:grid-cols-4'>
				{footerLinksData.columns.map((links, index) => (
					<FooterLinks key={index} links={links} />
				))}
			</div>
			<p className='my-1 text-sm text-[#6c6c6c]'>Netflix in Canada</p>
		</div>
	);
};

export default Footer;
