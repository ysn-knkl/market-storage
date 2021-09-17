import { useState } from "react";
import { Table, Icon, Input, Button } from "semantic-ui-react";
import { useFetch, deleteHandler } from "../utils/function";
import { initialSearch } from "../utils/constant";

const proArray = [];

const ProductList = ({ updateHandler }) => {
  const { contactList, isLoading } = useFetch();
  const [pSearch, setPSearch] = useState(initialSearch);
  const [sumPrice, setSumPrice] = useState(0);
  const [pageContact, setpageContact] = useState([0, 10]);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setPSearch({ ...pSearch, [name]: value });
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const searchProduct = contactList.filter(
        (pro) => pSearch.search === pro.barcode
      );
      if (searchProduct.length > 0) {
        setPSearch({
          search: "",
          barcode: searchProduct[0].barcode,
          pName: searchProduct[0].pName,
          pPrice: searchProduct[0].pPrice,
        });
        proArray.push({
          barcode: searchProduct[0].barcode,
          pName: searchProduct[0].pName,
          pPrice: searchProduct[0].pPrice,
        });
        calSumPrice();
      }
    }
  };

  const calSumPrice = () => {
    let sum = 0;
    proArray.map((a) => (sum += parseFloat(a.pPrice)));
    setSumPrice(sum);
  };

  const deleteSellingProduct = () => {
    setSumPrice(0);
    proArray.length = 0;
  };

  const contactpage = (position) => {
    if (position === "right") {
      setpageContact([pageContact[0] + 10, pageContact[1] + 10]);
    } else {
      if (pageContact[0] > 0) {
        setpageContact([pageContact[0] - 10, pageContact[1] - 10]);
      }
    }
  };

  return (
    <>
      <div>
        <h2 className="contact-header" icon="angle right">
          {" "}
          Product List
        </h2>
        <Table size="large" className="table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Barcode</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Product Name
              </Table.HeaderCell>
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
              contactList?.slice(pageContact[0], pageContact[1]).map((item) => (
                <Table.Row key={item?.id}>
                  <Table.Cell>{item?.barcode?.toUpperCase()}</Table.Cell>
                  <Table.Cell>{item?.pName}</Table.Cell>
                  <Table.Cell>{item?.pPrice} tl</Table.Cell>
                  <Table.Cell>
                    <Icon
                      name="delete"
                      onClick={() => deleteHandler(item.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Icon name="edit" onClick={() => updateHandler(item)} />
                  </Table.Cell>
                </Table.Row>
              ))
            )}
            <Table.Row>
              <Table.Cell
                icon="angle left"
                textAlign="right"
                onClick={() => contactpage("left")}
              ></Table.Cell>
              <Table.Cell textAlign="center">{pageContact[0]}</Table.Cell>
              <Table.Cell textAlign="center">{pageContact[1]}</Table.Cell>
              <Table.Cell
                icon="angle right"
                textAlign="left"
                onClick={() => contactpage("right")}
              ></Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
      <div>
      <h2 className="contact-header" icon="angle right">
          {" "}
          Sales List
        </h2>
        <Table size="large" className="table">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">Barcode</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Product Name
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                Product Price{" "}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">
                <Input
                  fluid
                  name="search"
                  placeholder="Search"
                  type="number"
                  icon="search"
                  iconPosition="left"
                  value={pSearch.search}
                  onChange={handleSearchChange}
                  onKeyDown={handleEnter}
                />
              </Table.Cell>

              {proArray[0] && (
                <>
                  <Table.Cell textAlign="center">
                    <Button
                      color="teal"
                      fluid
                      size="large"
                      type="button"
                      onClick={deleteSellingProduct}
                    >
                      Sell
                    </Button>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button fluid size="large">
                      {sumPrice} tl
                    </Button>
                  </Table.Cell>
                </>
              )}
            </Table.Row>

            {proArray[0] &&
              proArray.map((item, key) => (
                <Table.Row key={key}>
                  <Table.Cell textAlign="center">{item.barcode}</Table.Cell>
                  <Table.Cell textAlign="center">{item.pName}</Table.Cell>
                  <Table.Cell textAlign="center">{item.pPrice} tl</Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default ProductList;
