import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useGetAllCabins } from "./useCabins";
import Table from "../../ui/Table";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isGettingAllCabins, getAllCabins, error } = useGetAllCabins();
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortValue = searchParams.get("sortBy") || "all";

  if (isGettingAllCabins) return <Spinner />;

  let filteredValues = [...getAllCabins]; // Initialize with all cabins

  // Filtering logic
  if (filterValue === "no-discount") {
    filteredValues = filteredValues.filter((curr) => curr.discount === 0);
  } else if (filterValue === "with-discount") {
    filteredValues = filteredValues.filter((curr) => curr.discount > 0);
  }

  // Sorting logic
  if (sortValue === "price-decrease") {
    filteredValues.sort((a, b) => a.reg_price - b.reg_price);
  } else if (sortValue === "price-increase") {
    filteredValues.sort((a, b) => b.reg_price - a.reg_price);
  } else if (sortValue === "name-asc") {
    filteredValues.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "name-dec") {
    filteredValues.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortValue === "capacity-max") {
    filteredValues.sort((a, b) => b.maxCapacity - a.maxCapacity);
  } else if (sortValue === "capacity-min") {
    filteredValues.sort((a, b) => a.reg_price - b.reg_price);
  }

  if (error) return <div>{error.message}</div>;

  return (
    <Table columns="0.7fr 1.2fr 2.5fr 2.2fr 1fr 1fr 1fr">
      <Table.Header name="cabin">
        <div>Image</div>
        <div>Name</div>
        <div>Description</div>
        <div>Capacity</div>
        <div>Discount</div>
        <div>Price</div>
      </Table.Header>
      <Table.Body>
        {filteredValues.map((cabin) => (
          <CabinRow cabin={cabin} key={cabin.id} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CabinTable;
