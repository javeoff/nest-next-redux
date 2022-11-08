import { useSelector } from 'react-redux';
import { IState } from '../common/types/IState';
import { IProduct } from '../common/types/IProduct';
import Link from 'next/link';
import { Feature } from '../common/enums/Feature';

const IndexPage = () => {
  const products = useSelector((state: IState) => state[Feature.COMMON].products) as IProduct[];

  return (
    <>
    <h1>Index Page</h1>
      {products?.map((product) => (
        <div key={product.id}>
          <div>{product.name} - {product.id}</div>
          <Link href={product.id}><button>got to product</button></Link>
        </div>
      ))}
    </>
  )
}

export default IndexPage;
