import Layout from "../Layout/Layout";
import { Acent, Container, Item } from "./ItemsList.styled";
import useItemsList from "./useItemsList";

const ItemsList = () => {
  const { filteredItemsList, handleItemClick } = useItemsList();
  return (
    <Layout title="Обладнання">
      <Container>
        {filteredItemsList.map((item) => (
          <Item
            key={item.code}
            onClick={() => {
              handleItemClick(item);
            }}
          >
            <Acent>{item.code}</Acent>
            <div key={item.code}>{item.description}</div>
            <Acent>({item.manufacturer})</Acent>
          </Item>
        ))}
      </Container>
    </Layout>
  );
};

export default ItemsList;
