import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Snackbar,
  SnackbarContent,
  Tooltip,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../Slices/Products/products";
import { ToastContainer, toast } from "react-toastify";
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



function HeroSection() {
  const [cartList, setcartList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [isLording, setIsLording] = useState(false);
  const [categoryOption, setCategoryOption] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState({});

  const { isToast, isProductAdd } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  console.log(isToast, "toast");

  const cartHandler = (product) => {
    const isExist = cartList.find((cart) => cart.id === product.id);

    if (!isExist) {
      setcartList((prev) => [...prev, product]);
    } else {
      setOpenAlert(true);
    }
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLording(true);
        const products = await axios.get("https://fakestoreapi.com/products");

        if (products.status === 200) {
          setIsLording(false);
          setProducts(products?.data);
          setAllProducts(products?.data);

          const filterCategories = products?.data?.map((product) => {
            return {
              label:
                product?.category?.charAt(0)?.toUpperCase() +
                product?.category?.substring(1),
              value: product?.category,
            };
          });
          const uniqueCategory = filterCategories.filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.value === item.value)
          );
          setCategoryOption(uniqueCategory);
        } else {
          setIsLording(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let filterProduct = allProducts?.filter(
      (product) => product?.category === categoryFilter?.value
    );
    setProducts(filterProduct);
    console.log(filterProduct);
  }, [categoryFilter]);
  useEffect(() => {
    if (isToast) {
      toast("Product already added!");
    }
    if (isProductAdd) {
      toast("Product added successfully!");
    }
  }, [isToast, isProductAdd]);

  return (
    <>
      <ToastContainer />
      <Autocomplete
        className="mt-5 ms-4"
        size="small"
        disablePortal
        options={categoryOption}
        sx={{ width: 300 }}
        onChange={(e, newValue) => {
          setCategoryFilter(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Categories" />}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <SnackbarContent
          style={{ backgroundColor: "red" }}
          message={
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <Box sx={{ paddingRight: "60px" }}>
                <span id="client-snackbar">Product already in cart list</span>
              </Box>
              <Box>
                <CloseIcon onClick={handleClose} />
              </Box>
            </Box>
          }
        ></SnackbarContent>
      </Snackbar>
      {isLording ? (
        <Box className="text-center mt-5">
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box className=" mx-3 px-3">
          <Grid container className="container text-center">
            {products?.map((product, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} xl={3} mb={3}>
                  <Card
                    key={index}
                    className="card-container my-5   "
                    sx={{ padding: "1px", width: "300px" }}
                  >
                    <Box
                      className="text-center"
                      sx={{ cursor: "pointer", margin: "15px" }}
                    >
                      <Swiper
                       spaceBetween={30}
                       centeredSlides={true}
                       autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                          modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                      >
                        <SwiperSlide>
                          <img
                            style={{ minHeight: "120px", maxHeight: "120px" }}
                            className="product-img mb-5 "
                            width="100px"
                            src={product.image}
                            alt="product-img"
                          />
                        </SwiperSlide>
                        <SwiperSlide>
                          <img
                            style={{ minHeight: "120px", maxHeight: "120px" }}
                            className="product-img mb-5 "
                            width="100px"
                            src={product.image}
                            alt="product-img"
                          />
                        </SwiperSlide>
                      </Swiper>

                      <Tooltip title={product?.title} placement="top">
                        <Typography
                          className="my-3 text-secondary"
                          variant="h6"
                        >
                          {product?.title?.length >= 22
                            ? `${product?.title?.slice(0, 18)}...`
                            : product?.title}
                        </Typography>
                        <Typography variant="h5">{product.price}</Typography>
                      </Tooltip>
                      <Divider
                        sx={{ borderColor: "black" }}
                        variant="fullWidth"
                      />
                      <Box className="d-flex justify-content-between mx-4">
                        <Tooltip title="Product Details">
                          <VisibilityIcon
                            className=" my-3 fs-2"
                            onClick={() => {
                              navigate(`/ProductDetails/${product?.id}`);
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Add to Favorite">
                          <FavoriteIcon className=" my-3 fs-2" />
                        </Tooltip>
                        <Tooltip title="Add to Cart">
                          <AddShoppingCartIcon
                            className=" my-3 fs-2"
                            onClick={() => dispatch(addProduct(product))}
                          />
                        </Tooltip>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
            ;
          </Grid>
        </Box>
      )}
    </>
  );
}

export default HeroSection;
