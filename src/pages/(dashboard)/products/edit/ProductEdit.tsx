import instance from "@/configs/axios";
import { BackwardFilled } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom";

type FieldType = {
  name?: string;
  price?: number;
  image?: string;
  description?: string
};

const ProductEditPage = () => {
  const {id} = useParams()
  const [messageApi, contextHolder] = message.useMessage()
  const queryClient = useQueryClient()
  const {data,isLoading, isError, error} = useQuery({
    queryKey: ["products",id],
    queryFn: async ()=>{
      try {
        return await instance.get(`/products/${id}`)
      } catch (error) {
        throw new Error("Lay sp that bai")
      }
    }
  })
  const {mutate} = useMutation({
    mutationFn: async (formData: FieldType) =>{
      try {
        return await instance.put(`/products/${id}`,formData)
      } catch (error) {
        throw new Error("Update sp that bai")
      }
    },
    onSuccess: ()=>{
      messageApi.open({
        type:"success",
        content: "Update sp thanh cong"
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
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    mutate(values)
  };
  if (isLoading) return <div>Loading....</div>
  if (isError) return <div>{error.message}</div>
  return (
    <>
    {contextHolder}
      <div className="flex item-center justify-between mb-5">
        <h1 className="text-2xl font-semibold">Them moi san pham</h1>
        <Button type="primary">
          <Link to={"/admin/products"}>
            <BackwardFilled /> Quay lai
          </Link>
        </Button>
      </div>
      <div className="max-w-4xl mx-auto">
        <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ ...data?.data }}
    onFinish={onFinish}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Ten sp"
      name="name"
      rules={[{ required: true, message: 'Name bat buoc phai nhap' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="price"
      name="price"
      rules={[{ required: true, message: 'Gia bat buoc nhap' }]}
    >
      <Input/>
    </Form.Item>
    <Form.Item<FieldType>
      label="description"
      name="description"
    >
      <TextArea rows={4} />
    </Form.Item>
    <Form.Item<FieldType>
      label="image"
      name="image"
    >
      <Input />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
      </div>
    </>
  );
};

export default ProductEditPage;
