import React , {useState} from 'react'
import { Space, Table,Button, Input, Modal } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';
type IProps = {
    category: any,
    onRemoveCategory: Function
}

const CategoriesManagement: React.FC<IProps> = ({ category, onRemoveCategory }) => {
    console.log(category);
    
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [filterName, setFilterName] = useState('');
    const handleDelete = () => {
        onRemoveCategory(selectedCategoryId);
      setModalVisible(false);
    };
    const filteredCategory = category.filter((categories: any) =>
        categories.name.toLowerCase().includes(filterName.toLowerCase())
    );
    const columns: ColumnsType<any> = [

        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Action',
          key: 'action',
          render: (_, record) => (
            <Space size="middle">
              <a onClick={() => {
                setSelectedCategoryId(record._id);
                setModalVisible(true);
              }}>Delete</a>
              <Link to={`/admin/categories/${record._id}/update`}>Update</Link>
              
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
            <Link to={'/admin/categories/add'}>Add New Category</Link>
          </Button>
        </div>
        <Table columns={columns} dataSource={filteredCategory} pagination={{ pageSize: 10 }} />
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
}

export default CategoriesManagement