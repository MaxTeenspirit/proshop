import {FaStar, FaStarHalfAlt, FaRegStar} from 'react-icons/fa';

import {IRatingProps} from './IRating';

const Rating = ({value, text}: IRatingProps) => {
	const renderStars = () => {
		const stars = [];
		const maxValue = 5;

		for (let i = 1; i <= maxValue; i++) {
			if (i <= value) {
				stars.push(<FaStar key={i} />);
			} else if (i - 0.5 === value) {
				stars.push(<FaStarHalfAlt key={i} />);
			} else {
				stars.push(<FaRegStar key={i} />);
			}
		}

		return stars;
	};

	return (
		<div className="rating">
			{renderStars()}
			{!!text && <span className="rating-text">{text}</span>}
		</div>
	);
};

export default Rating;
