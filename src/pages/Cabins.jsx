import CabinTable from "../features/cabins/CabinTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddCabin from "../features/cabins/AddCabin";
import FilterSortCabin from "../features/cabins/FilterSortCabin";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <FilterSortCabin />
      </Row>
      <Row type="vertical">
        <CabinTable />
      </Row>
      <AddCabin />
    </>
  );
}

export default Cabins;
