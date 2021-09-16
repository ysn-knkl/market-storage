import React from "react";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

const FormComponent = ({product, setProduct, handleFormSubmit}) => {


    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        setProduct({ ...product, [name]: value.toUpperCase() });
      };

      const handleEnter = (e) => {
        if(e.key === "Enter"){
         const asd = document.getElementsByTagName("Input")[1];
         asd.focus();

      }}
      

  return (
    <Grid textAlign="center" verticalAlign="middle">
      <Grid.Column style={{ width: "300px" }}>
        <div className="ui pilled segment">
          <div className="ui pilled brand">
            <code>{"<ysn-knkl />"}</code>
            <span className="design header">design</span>
          </div>
        </div>
        <h2 className="contact-header">Ürün Ekleme</h2>
        <Form size="large" onSubmit={handleFormSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="barcode"
              placeholder="Barcode"
              icon="barcode"
              iconPosition="left"
                value={product.barcode}
                onChange={handleInputChange}
              required
              className="barcode"
            />
             <Form.Input
              fluid
              name="pName"
              placeholder="Product Name"
              icon="cart arrow down"
              iconPosition="left"
                value={product.pName}
                onChange={handleInputChange}
                onKeyDown={handleEnter}
              required
            />
            <Form.Input
              fluid
              name="pPrice"
              placeholder="Product Price"
              icon="money bill alternate outline"
              iconPosition="left"
              type="text"
                value={product.pPrice}
                onChange={handleInputChange}
              required
            />
            <Button color="teal" fluid size="large" type="submit">
              Add
              {/* {info?.id ? "Update" : "Add"} */}
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default FormComponent;
