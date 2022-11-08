import { useSelector } from 'react-redux';
import { IState } from '../common/types/IState';
import { IProduct } from '../common/types/IProduct';

const IndexPage = () => {
  const products = useSelector((state: IState) => state.common.products) as IProduct[];

  return (
    <>
    <h1>Index Page</h1>
      {products?.map((product) => (
        <div key={product.id}>{product.id}</div>
      ))}
    </>
  )
}

export default IndexPage;
