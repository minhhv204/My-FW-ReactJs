import { IProduct } from '@/common/types/product'
import instance from '@/configs/axios'
import { PlusCircleFilled } from '@ant-design/icons'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, message, Popconfirm, Table } from 'antd'
import { Key, SortOrder } from 'antd/es/table/interface'
import { render } from 'react-dom'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
const [messageApi, contextHolder] = message.useMessage()
const queryClient = useQueryClient()
const {data, isLoading, isError, error} = useQuery({
  queryKey: ["products"],
  queryFn: async ()=>{
    try {
      return await instance.get(`/products`)
    } catch (error) {
      throw new Error("Lay danh sach sp that bai")
    }
  }
})
const {mutate} = useMutation({
  mutationFn: async (id: number | string) =>{
    try {
      return await instance.delete(`/products/${id}`)
    } catch (error) {
      throw new Error("Xoa that bai")
    }
  },
  onSuccess: ()=>{
    messageApi.open({
      type: "success",
      content: "Xoa sp thanh cong"
    })
    queryClient.invalidateQueries({
      queryKey: ["products"]
    })
  },
  onError: (error)=>{
    messageApi.open({
      type: "error",
      content: error.message
    })
  }
})
const dataSource = data?.data.map((product: IProduct)=>({
  key: product.id,
  ...product
}))
const columns = [
  {
    title: "name",
    dataIndex: "name"
  },
  {
    title: "price",
    dataIndex: "price"
  }
  ,
  {
    title: "image",
    dataIndex: "image",
    render: (item: string) => <img src={item} alt="" width={120} />
  }
  ,
  {
    title: "description",
    dataIndex: "description"
  }
  ,
  {
    title: "action",
    render: (_:any, product: IProduct) =>{
      return(
        <>
                <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
             onConfirm={()=>mutate(product.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
          <Button><Link to={`/admin/products/${product.id}/edit`}>Update</Link></Button>
                </>
      )
    }
      
  }
]
if (isLoading) return <div>Loading...</div>
if (isError) return <div>{error.message}</div>
  return (
    <div>
      {contextHolder}
    <div className="flex item-center justify-between mb-5">
      <h1 className="text-2xl font-semibold">Quan ly san pham</h1>
      <Button type="primary">
        <Link to={"/admin/products/add"}>
          <PlusCircleFilled /> Them San Pham
        </Link>
      </Button>
    </div>
    <Table dataSource={dataSource} columns={columns} />
  </div>
  )
}
export default ProductsPage