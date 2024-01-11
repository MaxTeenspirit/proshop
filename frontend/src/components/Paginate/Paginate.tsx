import {Pagination} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import {IPaginateProps} from './IPaginate';

const Paginate = ({totalPages = 1, currentPage = 1, isAdmin = false}: IPaginateProps) => {
	return (
		<>
			{totalPages > 1 && (
				<Pagination>
					{[...Array(totalPages).keys()].map((page) => {
						const actualPage = page + 1;
						return (
							<LinkContainer
								key={actualPage}
								to={!isAdmin ? `/page/${actualPage}` : `/admin/productlist/${actualPage}`}
							>
								<Pagination.Item active={actualPage === currentPage}>{actualPage}</Pagination.Item>
							</LinkContainer>
						);
					})}
				</Pagination>
			)}
		</>
	);
};

export default Paginate;
