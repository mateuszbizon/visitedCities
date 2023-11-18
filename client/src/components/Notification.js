import React, { useEffect } from 'react';
import { useNotification } from '../context/NotifiactionContext';

function Notification() {
    const { notification, hideNotification, error } = useNotification();

    useEffect(() => {
        let timer;

        if (notification) {
            timer = setTimeout(() => {
                hideNotification();
            }, 3000)
        }

        return () => {
            clearTimeout(timer);
        }
    }, [notification, hideNotification])

  return (
    <div className={notification ? error ? "notification notification-error show-notification" : "notification show-notification" : "notification"}>
        {notification && notification}
        <div className={notification && 'notification__time-status'}></div>
    </div>
  )
}

export default Notification