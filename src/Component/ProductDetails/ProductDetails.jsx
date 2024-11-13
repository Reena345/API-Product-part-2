import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShareIcon from '@mui/icons-material/Share';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

const ProductDetails = () => {
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

  return (
    
    <Box className="m-3 p-4 rounded-5 shadow-lg bg-body">
      {isLording ? (
        <Box className="text-center mt-5">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Grid container spacing={3} className="mt-3 align-items-center">
          <Grid item xs={12} md={6} className="text-center">
            <img
              className="img-fluid"
              style={{ maxWidth: "50%", minHeight: "50%", height: "auto" }}
              src={ProductDetail?.image}
              alt={ProductDetail?.title }
            />
          </Grid>

          <Grid item xs={12} md={6} className="  rounded-3">
            <Grid item md={5} >
              <Typography variant="body1" className="mt-2">
                {ProductDetail?.category}
              </Typography>
              <Typography variant="h5" className="mt-2">
                {ProductDetail?.title}
              </Typography>
              <Typography variant="body1" className="mt-2">
                {ProductDetail?.description}
              </Typography>
              <Typography variant="body1" className="mt-2">
              <StarOutlineIcon className="text-warning "/> 
              <StarOutlineIcon className="text-warning "/> 
              <StarOutlineIcon className="text-warning "/> 
              <StarOutlineIcon className="text-warning "/> 
              <StarOutlineIcon className="text-warning me-2"/> 
               Price: ${ProductDetail?.price}
              </Typography>
              <Typography variant="body1" className="mt-2">
                Available: {ProductDetail?.count}
              </Typography>
              <Box className='d-flex justify-content-between mt-4'>
                <Button variant="outlined"><FavoriteBorderIcon /></Button>
                <Button variant="outlined"><AddShoppingCartIcon /></Button>
                <Button variant="outlined"><ShareIcon /></Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ProductDetails;
