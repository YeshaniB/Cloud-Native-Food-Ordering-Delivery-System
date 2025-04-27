import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { Toast } from 'primereact/toast';

const NotificationToast = forwardRef((props, ref) => {
  const toast = useRef(null);

  useImperativeHandle(ref, () => ({
    showSuccess(message) {
      toast.current.show({
        severity: 'success',
        summary: 'Notification Sent ✅',
        detail: message,
        icon: 'pi pi-bell',
        life: 3000
      });
    },
    showError(message) {
      toast.current.show({
        severity: 'error',
        summary: 'Notification Failed ❌',
        detail: message,
        icon: 'pi pi-times-circle',
        life: 4000
      });
    }
  }));

  return <Toast ref={toast} position="top-right" />;
});

export default NotificationToast;
