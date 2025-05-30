import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Alert,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    productId: null,
    productName: "",
  });

  //implement the get products function
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get("http://localhost:5000/api/products");

      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (err) {
      setError("Error connecting to server: " + err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  //function to open delete confirmation dialog
  const handleDeleteClick = (product) => {
    setDeleteDialog({
      open: true,
      productId: product.id,
      productName: product.name,
    });
  };

  //function to confirm delete
  const handleDeleteConfirm = async () => {
    const { productId } = deleteDialog;

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );

      if (response.data.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        setError("Failed to delete product");
      }
    } catch (err) {
      setError("Error deleting product: " + err.message);
      console.error("Error deleting product:", err);
    } finally {
      setDeleteDialog({ open: false, productId: null, productName: "" });
    }
  };

  //function to cancel delete
  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, productId: null, productName: "" });
  };

  //implement the reset function
  const handleReset = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/products/reset"
      );

      if (response.data.success) {
        await fetchProducts();
      } else {
        setError("Failed to reset products");
      }
    } catch (err) {
      setError("Error resetting products: " + err.message);
      console.error("Error resetting products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* title */}
      <Box textAlign="center" mb={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Simple Card List
        </Typography>
      </Box>

      {/* error message */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* product grid */}
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card
              sx={{
                maxWidth: 345,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* delete button */}
              <IconButton
                onClick={() => handleDeleteClick(product)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  color: "error.main",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                  zIndex: 1,
                }}
                size="small"
              >
                <DeleteIcon />
              </IconButton>

              {/* pics of products */}
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />

              {/* information */}
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" fontWeight="bold">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* improved empty state when no products */}
      {!loading && products.length === 0 && (
        <Box textAlign="center" mt={6} py={6}>
          <Typography variant="h4" color="text.secondary" gutterBottom>
            No Products Available
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={4}>
            All products have been deleted. You can restore them by clicking the
            button below.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
            }}
          >
            Restore All Products
          </Button>
        </Box>
      )}

      {/* delete confirmation dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete{" "}
            <strong>{deleteDialog.productName}</strong>? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductList;
