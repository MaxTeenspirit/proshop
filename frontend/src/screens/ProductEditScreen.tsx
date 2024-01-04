import {FormEvent, ChangeEvent, useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import {Message, Loader, FormContainer} from '../components';
import {useUpdateProductMutation, useGetProductDetailQuery} from '../redux/slices/productsApiSlice';

const ProductEditScreen = () => {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	const {id: productId} = useParams();
	const {data: product, isLoading, error: getProductError} = useGetProductDetailQuery(productId || '');
	const [updateProduct, {isLoading: loadingUpdateProduct}] = useUpdateProductMutation();

	useEffect(() => {
		if (product) {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setBrand(product.brand);
			setCategory(product.category);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [product, product?.name]);

	const handleInputChange = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
		const value: string | number = e.target.value;

		switch (type) {
			case 'name':
				setName(value);
				break;
			case 'price':
				setPrice(+value);
				break;
			case 'image':
				setImage(value);
				break;
			case 'brand':
				setBrand(value);
				break;
			case 'category':
				setCategory(value);
				break;
			case 'countInStock':
				setCountInStock(+value);
				break;
			case 'description':
				setDescription(value);
				break;
		}
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const updatedProduct = {
			_id: productId,
			name,
			price,
			image,
			brand,
			category,
			countInStock,
			description,
		};

		//@ts-ignore
		const result = await updateProduct(updatedProduct);

		//@ts-ignore
		if (result.error) {
			toast.error('Not updated');
		} else {
			toast.success('Product Updated');
			navigate('/admin/productlist');
		}
	};

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			{isLoading ? (
				<Loader />
			) : getProductError ? (
				<Message variant="danger">Product not found</Message>
			) : (
				<FormContainer>
					<h1>Edit Product</h1>
					<Form onSubmit={handleSubmit}>
						<Form.Group controlId="name" className="my-3">
							<Form.Label>Name</Form.Label>
							<Form.Control
								onChange={handleInputChange('name')}
								type="text"
								placeholder="Enter name"
								value={name}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="price" className="my-3">
							<Form.Label>Price</Form.Label>
							<Form.Control
								onChange={handleInputChange('price')}
								type="number"
								step="0.01"
								placeholder="Enter price"
								value={price}
							></Form.Control>
						</Form.Group>

						{/*IMAGE INPUT PLACEHOLDER*/}
						<Form.Group controlId="brand" className="my-3">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								onChange={handleInputChange('brand')}
								type="text"
								placeholder="Enter brand"
								value={brand}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="category" className="my-3">
							<Form.Label>Category</Form.Label>
							<Form.Control
								onChange={handleInputChange('category')}
								type="text"
								placeholder="Enter category"
								value={category}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="countInStock" className="my-3">
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								onChange={handleInputChange('countInStock')}
								type="number"
								step="1"
								placeholder="Enter count in stock"
								value={countInStock}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId="description" className="my-3">
							<Form.Label>Description</Form.Label>
							<Form.Control
								onChange={handleInputChange('description')}
								as="textarea"
								rows={3}
								placeholder="Enter description"
								value={description}
							></Form.Control>
						</Form.Group>
						<Button type="submit" variant="primary" className="my-2 px-4">
							Update
						</Button>
					</Form>
				</FormContainer>
			)}
		</>
	);
};

export default ProductEditScreen;
