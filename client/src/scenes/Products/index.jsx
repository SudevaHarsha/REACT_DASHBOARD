import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";

const Product = ({
    p
}) =>{
    const {
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
    } = p;
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card
          sx={{
            backgroundImage:"none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"
          }}
        >
            <CardContent>
                <Typography sx={{fontSize: 14}} color={theme.palette.secondary[700]} gutterBottom>
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb:"1.5rem"}} color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography variant="body2">{description}</Typography>
            </CardContent>
            <CardActions>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                    see more
                </Button>
            </CardActions>
            <Collapse
              in={isExpanded}
              timeout="false"
              unmountOnExit
              sx={{
                color: theme.palette.neutral[300]
              }}
            >
                <CardContent>
                    <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Yaerly Sales This Year: {stat.yearlySalesTotal}</Typography>
                    <Typography>Yealy Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

const Products = () => {
    const {data, isLoading} = useGetProductsQuery();
    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    console.log(data);
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="See all of your products"></Header>
        {data || !isLoading ? 
        <Box 
          mt="20px"
          display="grid" 
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div" : {gridColumn: isNonMobile ? undefined : "span 4"}
          }}
          >
           {data.map((p)=>(
            <Product key={p._id}
             p={p}
            ></Product>
           ))}
        </Box>
         : <>Loading...</>}
    </Box>
  )
}

export default Products;