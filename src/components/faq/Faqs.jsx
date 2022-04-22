import faqsData from '../../content/faq';
import Subscribe from '../Subscribe';
import Faq from './Faq';

const Faqs = () => {
	return (
		// mx-auto my-12 max-w-screen-md text-center text-5xl font-bold
		<div className='my-24'>
			<h1 className='my-6 text-center text-3xl font-semibold sm:text-5xl'>
				Frequently Asked Questions
			</h1>
			{faqsData.map((faq) => (
				<Faq key={faq.id} {...faq} />
			))}
			<div className='mt-10'>
				<Subscribe />
			</div>
		</div>
	);
};

export default Faqs;
