import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import "../../common/Main/";
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
    margin: "auto",
    width: "100vh",
  },
}));

export default function Main() {
  const [products, setProducts] = useState([
    { id: 1, name: "Produto 1", code: "P1", uom: "unidade" },
    { id: 2, name: "Produto 2", code: "P2", uom: "kg" },
    { id: 3, name: "Produto 3", code: "P3", uom: "litro" },
  ]);

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", code: "", uom: "" });
  const [editProduct, setEditProduct] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
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
    const newProduct = { ...editProduct };
    const index = products.findIndex((p) => p.id === editProduct.id);
    let newProducts = [...products];
    newProducts[index] = newProduct;
    setProducts(newProducts);
    setEditProduct({});
    setOpen(false);
  };

  const handleDelete = (code) => {
    const newProducts = products.filter((product) => product.code !== code);
    setProducts(newProducts);
  };
  

  return (
    <>
      <TableContainer
        className={`${classes.tableContainer} center-table`}
        component={Paper}
        style={{ overflow: "auto", maxHeight: "50vh" }}
      >
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do Produto</TableCell>
              <TableCell align="right">Código</TableCell>
              <TableCell align="right">UOM</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.code}>
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.code}</TableCell>
                <TableCell align="right">{product.uom}</TableCell>
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
