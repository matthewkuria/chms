import InventoryTable from "../../components/InventoryTable"
export default function InventoryPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Inventory Records</h1>
      <InventoryTable />
    </div>
  );
}