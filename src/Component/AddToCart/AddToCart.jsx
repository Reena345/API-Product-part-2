import { Button, ButtonGroup, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { decreaseQuantity, increaseQuantity } from "../../Slices/Products/products";

const AddToCard = (props) => {
  const { open, toggleDrawer } = props;

  const { items } = useSelector((state) => state.products);
  const dispatch =useDispatch();

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 450 }}
          role="presentation"
        >
          <Box>
            <Typography
              sx={{
                backgroundColor: "#006ca8",
                color: "white",
                padding: "10px 0px",
              }}
              variant="h4"
            >
              Cart List
            </Typography>
            {items?.map((item) => {
              return (
                <Box
                  sx={{ display: "flex" }}
                  key={item.id}
                  style={{ width: "400px" }}
                  className="mt-1"
                >
                  <Box className="d-flex justify-content-between align-items-center mx-1">
                    <div>
                      <img
                        style={{ width: "15%" }}
                        src={item?.image}
                        alt="Product-image"
                      />
                      <span>
                        {item?.title?.length >= 15
                          ? `${item?.title?.slice(0, 15)}...`
                          : item?.title}
                      </span>
                    </div>
                    <ButtonGroup size="small" variant="text" aria-label="Basic button group">
                      <Button><RemoveIcon onClick={()=> dispatch(decreaseQuantity(item))}/></Button>
                      <Button>{item?.quantity}</Button>
                      <Button><AddIcon onClick={()=> dispatch(increaseQuantity(item))}/></Button>
                    </ButtonGroup>
                    <span>{item?.price}</span>
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
