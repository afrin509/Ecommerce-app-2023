import AdminMenu from "../../comopnents/Layout/AdminMenu.js";
import Layout from "../../comopnents/Layout/Layout.js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Buffer } from "buffer";
import {
  Button,
 
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  RcFile,
  UploadFile,
  Modal,
} from "antd";

import {
  UploadOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const UpdateProduct = () => {
  
  const [loading, setLoading] = useState(false);
  const [imageSrc,setImageSrc]=useState('');
  const navigate = useNavigate();
  const params=useParams();
  const[Id,setId]=useState('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping,setShipping]=useState('');
  let [categories, setCategories] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
//   const getBlobFromUrl = (myImageUrl) => {
//     return new Promise((resolve, reject) => {
//         let request = new XMLHttpRequest();
//         request.open('GET', myImageUrl, true);
//         request.responseType = 'blob';
//         request.onload = () => {
//             resolve(request.response);
//         };
//         request.onerror = reject;
//         request.send();
//     })
// }

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("inside loading the uploaded image");
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        console.log("inside error while uploaded image", error);
        reject(error);
      };
    });
    const getBlobFromUrl = (myImageUrl) => {
      return new Promise((resolve, reject) => {
          let request = new XMLHttpRequest();
          request.open('GET', myImageUrl, true);
          request.responseType = 'blob';
          request.onload = () => {
              resolve(request.response);
          };
          request.onerror = reject;
          request.send();
      })
  }
  
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    // console.log('file',file);
    if(file.url)
    {
      try{
        let data=await getBlobFromUrl(file.url);
        file.preview=await getBase64(data);
      }
      catch(err)
      {
        console.log("error in handle preview while converting url to blob", err);

      }
    }
    if ( !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj);
      } catch (Err) {
        console.log("error in handle preview converting uploaded file data into encoded base64 string", Err);
      }
    }

    setPreviewImage(file.preview);
    setPreviewOpen(true);
    // setPreviewTitle(
    //   file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    // );
  };
  
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const len=newFileList.length;
    console.log("length of new file list",len)
    setImageSrc(newFileList[len-1].originFileObj);
  };
   
  const handleUpdateProduct = async () => {
    // e.preventDefault();
    const productData=new FormData();
    productData.append("name", name);
    productData.append("description", description);
    productData.append("price", price);
    productData.append("quantity", quantity);
    if(imageSrc){
      console.log("imagesrc before updating",imageSrc)
      productData.append("photo", imageSrc);
    }
    productData.append("category", category);
    productData.append("shipping",shipping);
    
    //  console.log(name, description, price, quantity,category,{'photo':fileList[0].preview})
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${Id}`,
        // { name, description, price, quantity,category,photo:fileList[1].preview,shipping },
        productData,
        { headers: { 'Content-Type': 'multipart/form-data'}}
      );
      if (!data?.success) {
        toast.error(data?.message);

      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("something went wrong while creating product");
    }
  };
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      setCategories(data?.categories);
    } catch (err) {
      toast.error("Something wwent wrong in getting catgeory", err);
    }
  };
  const getSingleProduct = async () => {

    try {
        console.log('inside getsingleproduct')
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/single-product/${params.slug}`
      );
      console.log('data',data);
      setName(data.singleProduct.name);
      setId(data.singleProduct._id);
      setDescription(data.singleProduct.description);
      setPrice(data.singleProduct.price);
      setQuantity(data.singleProduct.quantity);
      setShipping(data.singleProduct.shipping);
      setCategory(data.singleProduct.category._id);
      // setImageSrc(data.singleProduct.photo.data);
      // const imageUrl=URL.createObjectURL(getBase64(data.singleProduct.photo.data));
      const buffer=data.singleProduct.photo.data;
     const base64String=  Buffer.from(buffer).toString('base64');
    console.log("data",data.singleProduct.photo.data,base64String);
       setFileList([{
        uid: '-1',
        name: 'image.jpeg',
        status: 'done',
        url: `data:image/jpeg;base64,${base64String}`,
      },]);

      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getSingleProduct();
  }, []);

//   const handleProductImageUpload = ({ filesList }) => {
//     // if (info.file.status === "uploading") {
//     // 	console.log("inside uploading the image");
//     // 	toast.success('before uploading the image')

//     // 	setLoading(true);
//     // 	return;
//     // }
//     // if (info.file.status === "done") {
//     // 	// Get this url from response in real world.
//     // 	console.log("afPter uploading the image");
//     //      toast.success('after uploading the image')
//     // 	getBase64(info.file.originFileObj, (url) => {
//     // 		setLoading(false);
//     // 		setPhoto(info.file.originFileObj);
//     // 		setImageUrl(url);
//     // 	});
//     // }
//     // if (info.file.status === 'error')
//     // {
//     // 	toast.error('error while uploading image to the product');
//     // 	setLoading(false);
//     // 	console.log('image upload error',info.file.status.message);
//     // }
//     console.log("filesList", filesList);
//     setFileList(filesList);
//   };
const handleDelete = async () => {
  try {
    let answer = window.prompt("Are You Sure want to delete this product ? ");
    if (!answer) return;
    const { data } = await axios.delete(
      `http://localhost:8080/api/v1/product/delete-product/${Id}`
    );
    toast.success("Product DEleted Succfully");
    navigate("/dashboard/admin/products");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};
  console.log("imagesrc",imageSrc)
  const uploadButton = loading ? <LoadingOutlined /> : <PlusOutlined />;
  console.log("shipping",shipping);
  return (
    <Layout title="create-product">
            <div className="row">

       <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
        <h5 className="p-3">Update Product</h5>
   
      <Form
       
       enctype="multipart/form-data"
	     onFinish={handleUpdateProduct}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 600,
        }}
      >
        <Form.Item label="Categories">
          <Select value={category} onChange={(value) => setCategory(value)}>
            {categories.map((category, index) => {
              return (
                <Select.Option value={category._id}>{category.name}</Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item >
          <>
            <Upload
             htmlType='file'
            name="photo"
              listType="picture-circle"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => {
                return false;
              }}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img
                alt="example"
                style={{
                  width: "100%",
                }}
                src={previewImage}
              />
            </Modal>
          </>
        </Form.Item>

        <Form.Item label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item label="Price">
          <InputNumber value={price} onChange={(e) => setPrice(e)} />
        </Form.Item>
        <Form.Item label="Quantity">
          <InputNumber
            value={quantity}
            onChange={(e) => {
              setQuantity(e);
            }}
          />
        </Form.Item>
        <Form.Item label="Shipping">
          <Select value={shipping?"1":"0"} onChange={(value) => setShipping(value)}>
            <Select.Option value="1">Yes</Select.Option>
            <Select.Option value="0">No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item >
          <Button htmlType="submit" type="primary" >Update Product</Button>
          <Button onClick={handleDelete} type="primary" danger>Delete Product</Button>

        </Form.Item>
       
       
      </Form>
      </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
