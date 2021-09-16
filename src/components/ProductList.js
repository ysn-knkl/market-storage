import { useState } from "react";
import { Table, Icon, Input } from "semantic-ui-react";
import { useFetch, deleteHandler } from "../utils/function";
import {initialSearch} from "../utils/constant"

const ProductList = ({ updateHandler }) => {
  const { contactList, isLoading } = useFetch();
  const [pSearch, setPSearch] = useState(initialSearch);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setPSearch({ ...pSearch, [name]: value });
  };
  const handleEnter = (e) => {
   if(e.key === 'Enter'){
      const searchProduct = contactList.filter(pro => pSearch.search === pro.barcode);
      if(searchProduct.length>0){
        setPSearch({search:"", barcode: searchProduct[0].barcode, pName: searchProduct[0].pName, pPrice:searchProduct[0].pPrice })
      }
      
   }
  };

  return (
    <div>
      <h2 className="contact-header"> Contacts</h2>
      <Table size="large" className="table">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Barcode</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Product Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Product Price{" "}
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                <p>Loading...</p>
              </Table.Cell>
            </Table.Row>
          ) : contactList?.length === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={5} textAlign="center">
                <p className="nothing-found">Nothing Founded...</p>
              </Table.Cell>
            </Table.Row>
          ) : (
            contactList?.slice(0, 25).map((item) => (
              <Table.Row key={item?.id}>
                <Table.Cell>{item?.barcode?.toUpperCase()}</Table.Cell>
                <Table.Cell>{item?.pName}</Table.Cell>
                <Table.Cell>{item?.pPrice} tl</Table.Cell>
                <Table.Cell>
                  <Icon name="delete" onClick={() => deleteHandler(item.id)} />
                </Table.Cell>
                <Table.Cell>
                  <Icon name="edit" onClick={() => updateHandler(item)} />
                </Table.Cell>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">Search with Barcode</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Barcode</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">Product Name</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              Product Price{" "}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
          <Table.Cell textAlign="center" ><Input
              fluid
              name="search"
              placeholder="Search"
              type="number"
              icon="search"
              iconPosition="left"
              value={pSearch.search}
              onChange={handleSearchChange}
              onKeyDown={handleEnter}
            /></Table.Cell>
            
            <Table.Cell textAlign="center" >{pSearch.barcode}</Table.Cell>
            <Table.Cell textAlign="center" >{pSearch.pName}</Table.Cell>
            <Table.Cell textAlign="center" >{pSearch.pPrice} tl</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default ProductList;
