import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from 'api/productApi';
function ProductDetail(props) {
    const [isLoading,setIsLoading]=useState(null)
    const[product,setProduct]=useState([])
    const params = useParams();
    useEffect(()=>{
        const getData=async()=>{
            setIsLoading(1)
            const res= await getProductDetail(params.id)
            console.log('◀◀◀ res ▶▶▶',res);
            if(res?.data?.payload){
                setProduct(res.data.payload)
                setIsLoading(2)
            }else setIsLoading(0)
        }
        getData()
    },[params])
    if(isLoading===1){
        return (
            <div>
                Loading......
            </div>
            
        );
    }
    if(isLoading===0){
        return (
            <div>
                Không có sản phẩm
            </div>
            
        );
    }
    return (
            <div>
                {product.name}
            </div>
            
        );
    
}

export default ProductDetail;