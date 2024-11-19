import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useEffect, useState } from "react";

const AddToCard = (props) => {
  const { open, toggleDrawer } = props;

  const [cartItems, setCartItem] = useState([]);
  console.log(cartItems);

  useEffect(() => {
    const carItemArr = localStorage.getItem("cartList");
    const parseCart = JSON.parse(carItemArr);
    setCartItem(parseCart);
  }, []);

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 450 }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
           <Box>
           <Typography sx={{backgroundColor:'#006ca8' ,color:'white' ,padding:'10px 0px'}} variant='h4' >Cart List</Typography>
          {cartItems?.map((item) => {
            return (
            
            
              <Box
                sx={{ display: "flex" }}
                key={item.id}
                style={{ width: "500px", margin: "20px" }}
              >
                
                <img className="w-25 me-3" src={item.img} alt="" />
                <Box>
                  <h5>{item.name}</h5>
                  <h6>{item.price}</h6>
                  <span>{item.title}</span>
                </Box>
              </Box>
             
            );
          })}
        </Box>
        </Box>
      </Drawer>
    </div>
  );
};
export default AddToCard;
