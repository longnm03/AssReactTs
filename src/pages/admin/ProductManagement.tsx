import React, { useState } from 'react';
import { IProduct } from '../../interfaces/product';
import { Space, Table,Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

type IProps = {
  products: IProduct[],
  onRemove: (id: string) => void,
}

const ProductManagement: React.FC<IProps> = ({ products, onRemove }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [filterName, setFilterName] = useState('');
  const handleDelete = () => {
    onRemove(selectedProductId);
    setModalVisible(false);
  };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterName.toLowerCase())
  );
  const columns: ColumnsType<IProduct> = [

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => {
            setSelectedProductId(record._id);
            setModalVisible(true);
          }}>Delete</a>
          <Link to={`/admin/products/${record._id}/update`}>Update</Link>
          
        </Space>
      ),
    },
  ];

 return (
  <div>
  <div style={{ display: 'flex', justifyContent: 'space-evenly',alignItems: 'center', paddingBlock: '16px' ,marginBottom: 16 }}>
  <Input.Search
    placeholder="Search by name"
    value={filterName}
    onChange={e => setFilterName(e.target.value)}
    style={{ width: 300, margin: '16px 0', border: '1px solid #d9d9d9', borderRadius: 4 }}
  />
    <Button type='primary' style={{ width: 200 }}>
      <Link to={'/admin/products/add'}>Add New Product</Link>
    </Button>
  </div>
  <Table columns={columns} dataSource={filteredProducts} pagination={{ pageSize: 10 }} />
  <Modal
        title="Delete Product"
        visible={modalVisible}
        onOk={handleDelete}
        onCancel={() => setModalVisible(false)}
      >
        <p>Are you sure you want to delete this product?</p>
      </Modal>
</div>
)
};

export default ProductManagement;
