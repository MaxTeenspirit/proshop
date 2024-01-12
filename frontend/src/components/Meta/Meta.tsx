import {Helmet} from 'react-helmet-async';

import {IMetaProps} from './IMeta';

const Meta = ({title, description, keywords}: IMetaProps) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keywords" content={keywords} />
		</Helmet>
	);
};

Meta.defaultProps = {
	title: 'ProShop',
	description: 'We sell the best products',
	keywords: 'electronics, buy electronics, buy iphone, apple, laptop, computer, headphones',
};

export default Meta;
