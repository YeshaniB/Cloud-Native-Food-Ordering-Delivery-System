import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/config';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function MenuItemList() {
  const [menuItems, setMenuItems] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', description: '', price: '' });
  const toast = useRef(null); // <-- Toast reference

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    api.get('').then((res) => setMenuItems(res.data));
  };

  const handleDelete = (id) => {
    api.delete(`/${id}`).then(() => {
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast.current.show({ severity: 'success', summary: 'Deleted', detail: 'Menu item deleted.', life: 3000 });
    });
  };

  const toggleAvailability = (id) => {
    api.patch(`/${id}/availability`).then((res) => {
      setMenuItems(menuItems.map(item =>
        item.id === id ? res.data : item
      ));
      toast.current.show({ severity: 'info', summary: 'Availability Updated', detail: 'Availability toggled.', life: 3000 });
    });
  };

  const startEditing = (item) => {
    setEditingId(item.id);
    setEditForm({ name: item.name, description: item.description, price: item.price });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: '', description: '', price: '' });
  };

  const saveEdit = (id) => {
    api.put(`/${id}`, editForm).then((res) => {
      setMenuItems(menuItems.map(item => item.id === id ? res.data : item));
      cancelEdit();
      toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Menu item updated successfully.', life: 3000 });
    });
  };

  const renderHeader = () => {
    return (
      <div className="flex justify-content-between align-items-center">
        <h3 className="m-0">Manage Menu Items</h3>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            placeholder="Search..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </span>
      </div>
    );
  };

  const imageBody = (item) => (
    <img
      src={`http://localhost:8081/api/menu/images/${item.imageUrl}`}
      alt={item.name}
      width="60"
    />
  );

  const availabilityBody = (item) => item.available ? '✅ Available' : '❌ Unavailable';

  const actionBody = (item) => {
    return editingId === item.id ? (
      <div className="flex gap-2">
        <Button label="Save" icon="pi pi-check" severity="success" onClick={() => saveEdit(item.id)} />
        <Button label="Cancel" icon="pi pi-times" severity="secondary" onClick={cancelEdit} />
      </div>
    ) : (
      <div className="flex gap-2">
        <Button icon="pi pi-pencil" severity="info" onClick={() => startEditing(item)} />
        <Button icon="pi pi-trash" severity="danger" onClick={() => handleDelete(item.id)} />
        <Button
          label={item.available ? "Disable" : "Enable"}
          icon="pi pi-refresh"
          severity="warning"
          onClick={() => toggleAvailability(item.id)}
        />
      </div>
    );
  };

  const editableText = (field) => (
    <InputText
      name={field}
      value={editForm[field]}
      onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
    />
  );

  const editableNumber = () => (
    <InputNumber
      name="price"
      value={editForm.price}
      onValueChange={(e) => setEditForm({ ...editForm, price: e.value })}
      mode="currency"
      currency="LKR"
      locale="en-LK"
    />
  );

  const rowClassName = (rowData) => {
    return editingId === rowData.id ? 'p-highlight' : '';
  };

  return (
    <div className="card">
      <Toast ref={toast} /> {/* Toast component here */}

      <DataTable
        value={menuItems}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 20]}
        globalFilter={globalFilter}
        globalFilterFields={['name', 'description']}
        header={renderHeader()}
        responsiveLayout="scroll"
        emptyMessage="No menu items found."
        rowClassName={rowClassName}
      >
        <Column header="Image" body={imageBody} />
        <Column header="Name" body={(row) => editingId === row.id ? editableText('name') : row.name} />
        <Column header="Description" body={(row) => editingId === row.id ? editableText('description') : row.description} />
        <Column header="Price" body={(row) => editingId === row.id ? editableNumber() : `Rs. ${row.price}`} />

        <Column header="Availability" body={availabilityBody} />
        <Column header="Actions" body={actionBody} style={{ minWidth: '220px' }} />
      </DataTable>
    </div>
  );
}

export default MenuItemList;
