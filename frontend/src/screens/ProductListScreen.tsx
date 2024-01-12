import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {toast, ToastContent} from 'react-toastify';

import {
	useGetProductsQuery,
	useCreateProductMutation,
	useDeleteProductMutation,
} from '../redux/slices/productsApiSlice';
import {Message, Loader, Paginate} from '../components';

const ProductListScreen = () => {
	const {pageNumber} = useParams();

	const {data, isLoading, error, refetch} = useGetProductsQuery({pageNumber, keyword: ''});
	const [createProduct, {isLoading: loadingNewProduct}] = useCreateProductMutation();
	const [deleteProduct, {isLoading: loadingDelete}] = useDeleteProductMutation();

	const handleCreateProduct = async () => {
		try {
			await createProduct();
			refetch();
		} catch (err) {
			toast.error(err as ToastContent<unknown>);
		}
	};

	const handleDelete = (id: string) => async () => {
		if (window.confirm('Are you sure you want to DELETE this product?')) {
			try {
				await deleteProduct(id);
				toast.success('Product deleted!');
				refetch();
			} catch (error) {
				toast.error('Error on deleting product');
			}
		}
	};

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-end">
					<Button disabled={loadingNewProduct} onClick={handleCreateProduct} className="btn-sm m-3">
						<FaEdit /> Create Product
					</Button>
				</Col>
			</Row>
			{isLoading || loadingNewProduct || loadingDelete ? (
				<Loader />
			) : error ? (
				<>
					{/*@ts-ignore*/}
					<Message variant="danger">{error?.data?.message || error?.error}</Message>
				</>
			) : (
				<>
					<Table striped hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>NAME</th>
								<th>PRICE</th>
								<th>CATEGORY</th>
								<th>BRAND</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{data?.products?.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td className="text-start">{product.name}</td>
									<td>{product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant="light" className="btn-sm mx-2">
												<FaEdit />
											</Button>
										</LinkContainer>
										<Button variant="danger" className="btn-sm" onClick={handleDelete(product._id)}>
											<FaTrash style={{color: 'white'}} />
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate isAdmin totalPages={data?.pages} currentPage={Number(pageNumber)} />
				</>
			)}
		</>
	);
};

export default ProductListScreen;
