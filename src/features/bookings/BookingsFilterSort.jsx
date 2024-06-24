import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function BookingsFilterSort() {
  return (
    <TableOperations>
      <Filter
        field="status"
        options={[
          { value: "all", label: "All" },
          { value: "unconfirmed", label: "Unconfirmed" },
          { value: "checked-in", label: "Checked In" },
          { value: "checked-out", label: "Checked Out" },
        ]}
      />
      <SortBy
        options={[
          { value: "none", label: "None" },
          { value: "cabin-name-asc", label: "Cabin Name (A - Z)" },
          { value: "cabin-name-desc", label: "Cabin Name (Z - A)" },
          { value: "guest-name-asc", label: "Guest Name (A - Z)" },
          { value: "guest-name-desc", label: "Guest Name (Z - A)" },
          { value: "date-desc", label: "Date (Latest - Oldest)" },
          { value: "date-asc", label: "Date (Oldest - Latest)" },
        ]}
      />
    </TableOperations>
  );
}
export default BookingsFilterSort;
