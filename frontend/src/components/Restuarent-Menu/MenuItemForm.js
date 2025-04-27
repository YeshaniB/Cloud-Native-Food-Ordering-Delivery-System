import React, { useState } from 'react';
import api from '../../api/config';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function MenuItemForm() {
  const [form, setForm] = useState({ name: '', description: '', price: 0 });
  const [file, setFile] = useState(null);
  const toast = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setForm(prev => ({ ...prev, price: e.value }));
  };

  const handleImageSelect = (e) => {
    setFile(e.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      toast.current.show({ severity: 'warn', summary: 'Image Required', detail: 'Please upload a menu image.', life: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("item", new Blob([JSON.stringify(form)], { type: "application/json" }));
    formData.append("image", file);

    api.post("", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(() => {
        toast.current.show({ severity: 'success', summary: 'Item Added', detail: 'Menu item added successfully!', life: 3000 });
        setForm({ name: '', description: '', price: 0 });
        setFile(null);
      })
      .catch((error) => {
        console.error("Upload error:", error);
        toast.current.show({ severity: 'error', summary: 'Upload Failed', detail: 'Check console for details.', life: 4000 });
      });
  };

  return (
    <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Toast ref={toast} />
      <h2 className="mb-6">Add New Menu Item</h2>
      <form onSubmit={handleSubmit} className="p-fluid">
        <div className="field">
          <label htmlFor="name">Name</label>
          <InputText id="name" name="name" value={form.name} onChange={handleInputChange} required style={{ marginBottom: '1rem' }} />
        </div>

        <div className="field">
          <label htmlFor="description">Description</label>
          <InputTextarea id="description" name="description" value={form.description} onChange={handleInputChange} style={{ marginBottom: '1rem' }} required autoResize />
        </div>

        <div className="field">
          <label htmlFor="price">Price (Rs.)</label>
          <InputNumber
            id="price"
            name="price"
            value={form.price}
            onValueChange={handlePriceChange}
            mode="currency"
            currency="LKR"
            locale="en-LK"
            required
            style={{ marginBottom: '1rem' }}
          />
        </div>
        

        <div className="field">
          <label htmlFor="image"></label>
          <FileUpload
            name="image"
            accept="image/*"
            customUpload
            auto
            mode="basic"
            chooseLabel="Choose Image"
            onSelect={handleImageSelect}
            maxFileSize={1000000}
            style={{ marginBottom: '1.5rem' }}
          />
        </div>

        <Button label="Add Item" icon="pi pi-plus" type="submit" className="mt-3" />
      </form>
    </div>
  );
}

export default MenuItemForm;
