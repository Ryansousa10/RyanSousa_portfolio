import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: "2%",
    marginBottom: "2%",
    margin: "auto",
    width: "100vh",
  },
}));

export default function Main() {
  const [products, setProducts] = useState(() => {
    const products = JSON.parse(localStorage.getItem("products"));
    return products
      ? products
      : [
          { id: 1, name: "Produto 1", code: "P1", uom: "unidade" },
          { id: 2, name: "Produto 2", code: "P2", uom: "kg" },
          { id: 3, name: "Produto 3", code: "P3", uom: "litro" },
        ];
  });

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", code: "", uom: "" });
  const [editProduct, setEditProduct] = useState({});

  const handleClose = () => {
    setOpen(false);
    setNewProduct({ name: "", code: "", uom: "" });
    setEditProduct({ name: "", code: "", uom: "" });
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.code || !newProduct.uom) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    setProducts([...products, newProduct]);
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
    setNewProduct({ name: "", code: "", uom: "" });
    setOpen(false);
  };

  const handleEditChange = (e) => {
    setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
  };

  const handleEdit = (product) => {
    setEditProduct({ ...product });
    setOpen(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editProduct.name || !editProduct.code || !editProduct.uom) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    const index = products.findIndex((p) => p.id === editProduct.id);
    const newProducts = [...products];
    newProducts[index] = editProduct;
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    setEditProduct({});
    setOpen(false);
  };

  const handleDelete = (code) => {
    const newProducts = products.filter((product) => product.code !== code);
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  return (
    <>
      <TableContainer
        className={`${classes.tableContainer} center-table`}
        component={Paper}
        style={{ overflow: "auto", maxHeight: "50vh", minHeight: "50vh" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Code</strong>
              </TableCell>
              <TableCell align="center">
                <strong>UOM</strong>
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="center">{product.code}</TableCell>
                <TableCell align="center">{product.uom}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEdit(product)}>Edit</Button>
                  <Button onClick={() => handleDelete(product.code)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogTitle id="form-dialog-title">
        {editProduct.name ? "Edit" : "Add"}
        Product
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To add or edit a product, please enter the product name, code, and
          unit of measure (UOM) below.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Product Name"
          fullWidth
          value={editProduct.name || newProduct.name}
          onChange={editProduct.name ? handleEditChange : handleChange}
        />
        <TextField
          margin="dense"
          name="code"
          label="Product Code"
          fullWidth
          value={editProduct.code || newProduct.code}
          onChange={editProduct.code ? handleEditChange : handleChange}
        />
        <TextField
          margin="dense"
          name="uom"
          label="UOM"
          fullWidth
          value={editProduct.uom || newProduct.uom}
          onChange={editProduct.uom ? handleEditChange : handleChange}
        />
        <div>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={editProduct.name ? handleEditSubmit : handleSubmit}
            color="primary"
          >
            {editProduct.name ? "Edit" : "Add"}
          </Button>
        </div>
      </DialogContent>
    </>
  );
}
