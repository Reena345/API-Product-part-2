import axios from 'axios';
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const useProductDetails = () => {
    const [ProductDetail, setProductDetail] = useState([]);
    const [isLording, setIsLording] = useState(false);
  
    const param = useParams();
    console.log(ProductDetail, "ProductDetail");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setIsLording(true);
          const products = await axios.get(
            `https://fakestoreapi.com/products/${param?.product_id}`
          );
  
          if (products.status === 200) {
            setIsLording(false);
            setProductDetail(products?.data);
          } else {
            setIsLording(true);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
  
  return {isLording,ProductDetail}
   
   
   
  
}

export default useProductDetails;
