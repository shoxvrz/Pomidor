import React, { useState, useEffect } from "react";
import { useGetAllDataQuery } from "../../toolkit/Food/foodApi";
import { toast } from "react-toastify";
import ListCard from "../../components/ListCard/ListCard";
import ChangeInfo from "../../components/ChangeInfo/ChangeInfo";
import "./ListPage.scss";
import axios from "axios";

const ListPage = () => {
  const { data: fetchedData, error, isLoading } = useGetAllDataQuery();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (fetchedData) {
      setData(fetchedData);
    }
  }, [fetchedData]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://66adf655b18f3614e3b65836.mockapi.io/pomidor/foodData/${id}`
      );

      if (response.status === 200) {
        setData((prevItems) => prevItems.filter((item) => item.id !== id));
        toast.success("Item deleted successfully");
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("Error deleting item");
    }
  };

  const handleUpdate = () => {
    useGetAllDataQuery.refetch();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    toast.error("Error fetching data.");
    return <p>Error fetching data.</p>;
  }

  return (
    <div className="list">
      <p className="list__title">Mahsulotlar</p>
      <div className="list__table">
        <div className="list__table-format">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {data.map((item) => (
          <ListCard
            key={item.id}
            {...item}
            onDelete={() => handleDelete(item.id)}
            onEdit={() => handleEdit(item)}
          />
        ))}
      </div>
      {selectedItem && (
        <ChangeInfo
          selectedItem={selectedItem}
          onClose={handleClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListPage;
