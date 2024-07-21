import { IProduct } from "@/common/types/product";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { useParams } from "react-router-dom";

type columnsProps= {
    handledelete: (id:number|string) =>void,
    handleupdate:(id:number|string) =>void
}
export const columns = ({handledelete,handleupdate}: columnsProps): ColumnDef<any>[] => [
  {
    accessorKey: "name",
    header: "Ten san pham",
  },
  {
    accessorKey: "price",
    header: "Gia san pham",
  },
  {
    accessorKey: "image",
    cell: ({row}) =>{
      return(
        <div>
          <img width={120} src={row?.original?.image} alt={row?.original?.name} />
        </div>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Mo ta san pham",
  },
  {
    id: "action",
    cell: ({row})=>{
        return(
            <div>
                <Button variant="destructive" onClick={()=>handledelete(row?.original?.id)}>Xoa</Button>
            </div>
        )
    },
  },
  {
    id: "action1",
    cell: ({row})=>{
        return(
            <div>
                <Button variant="default" onClick={()=>handleupdate(row?.original?.id)}>Update</Button>
            </div>
        )
    },
  },
];
