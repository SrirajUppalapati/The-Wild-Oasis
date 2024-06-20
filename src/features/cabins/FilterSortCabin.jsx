import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function FilterSortCabin() {
  return (
    <TableOperations>
      <Filter
        field="discount"
        options={[
          { value: "all", label: "All" },
          { value: "with-discount", label: "With Discount" },
          { value: "no-discount", label: "No Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "all", label: "None" },
          { value: "price-increase", label: "Price (High - Low)" },
          { value: "price-decrease", label: "Price (Low - High)" },
          { value: "name-asc", label: "Name (A - Z)" },
          { value: "name-dec", label: "Name (Z - A)" },
          { value: "capacity-max", label: "Capacity (High - Low)" },
          { value: "capacity-min", label: "Capacity (Low - High)" },
        ]}
      />
    </TableOperations>
  );
}

export default FilterSortCabin;
