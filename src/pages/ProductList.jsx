import { useState, useEffect } from "react";
import Product from "../components/Product";
import { Box, Grid2, Stack } from "@mui/material";
import ProductService from "../services/ProductService";
import { transformProducts } from "../util/mainUtil";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        const transformedProducts = transformProducts(data.products);
        setProducts(transformedProducts);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 4,
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "stretch",
          flexWrap: "nowrap",
          mt: 1,
        }}
      >
        <Grid2
          container
          spacing={2}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {products.map((product) => (
            <Grid2
              sx={{ height: "100%" }}
              item
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
            >
              <Product {...product} />
            </Grid2>
          ))}
        </Grid2>
      </Stack>
    </Box>
  );
}

export default ProductList;
