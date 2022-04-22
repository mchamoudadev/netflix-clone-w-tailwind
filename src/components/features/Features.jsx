import featureData from '../../content/features.json';
import Feature from './Feature';

export const Features = () => {
	return (
		<div className=''>
			{featureData.map((feature) => (
				<Feature key={feature.id} {...feature} />
			))}
		</div>
	);
};
