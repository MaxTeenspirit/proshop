import {ChangeEvent, useState, useCallback, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {useSearchParams} from 'react-router-dom';

import {debounce} from '../../helpers';

const Search = () => {
	const [getSearchParams, setSearchParams] = useSearchParams();

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		const searchParam = getSearchParams.get('search') || '';
		if (searchParam) {
			setSearchText(searchParam);
		} else {
			setSearchText('');
		}
		return () => {
			setSearchText('');
		};
	}, []);

	const setDebouncedSearch = debounce((searchValue) => {
		setSearchParams({search: searchValue});
	}, 800);

	const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setSearchText(value);
		setDebouncedSearch(value);
	}, []);

	return (
		<Form>
			<Form.Group controlId="search" className="my-3">
				<Form.Control
					onChange={handleSearchChange}
					type="text"
					placeholder="Search"
					value={searchText}
				></Form.Control>
			</Form.Group>
		</Form>
	);
};

export default Search;
