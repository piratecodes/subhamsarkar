"use client";

import { useEffect, useState } from "react";
import { savePushSubscription } from "@/actions/push";
import { toast } from "react-hot-toast";
import { X, BellRing } from "lucide-react";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  
  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub);
      
      if (sub) {
        // Silently sync existing subscriptions with the server
        // This ensures if we ever wipe the DB or update the schema, 
        // returning users are automatically re-registered!
        savePushSubscription(JSON.stringify(sub)).catch(e => console.error("Sync fail:", e));
      }

      if (Notification.permission === 'denied') {
        setPermissionDenied(true);
      } else if (Notification.permission === 'granted' && !sub) {
        // Silently re-subscribe since they already granted permission previously
        try {
          const newSub = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
          });
          setSubscription(newSub);
          await savePushSubscription(JSON.stringify(newSub));
        } catch (e) {
          // If silent subscribe fails (e.g. invalid old key), clear old sub
          const existingSub = await registration.pushManager.getSubscription();
          if (existingSub) await existingSub.unsubscribe();
          // Retry silently
          try {
            const retrySub = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
            });
            setSubscription(retrySub);
            await savePushSubscription(JSON.stringify(retrySub));
          } catch (retryErr) {
            console.error("Silent resubscribe failed:", retryErr);
          }
        }
      }
    } catch (error) {
      console.error("SW Registration failed:", error);
    }
  }

  async function subscribeToPush() {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        setPermissionDenied(true);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      
      let sub;
      try {
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
        });
      } catch (err) {
        // If subscribe fails because of an old/different VAPID key, unsubscribe and retry
        console.warn("Subscribe failed, attempting to clear old subscription...", err);
        const existingSub = await registration.pushManager.getSubscription();
        if (existingSub) {
          await existingSub.unsubscribe();
        }
        sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY)
        });
      }
      
      setSubscription(sub);
      
      // Send to server
      const res = await savePushSubscription(JSON.stringify(sub));
      if (res.success) {
        toast.success("Successfully subscribed to notifications!");
      } else {
        toast.error("Failed to save subscription on server.");
      }
    } catch (error) {
      console.error("Push subscription error:", error);
      if (Notification.permission === 'denied') {
        setPermissionDenied(true);
        toast.error("You have blocked notifications. Please enable them in your browser settings.");
      } else {
        toast.error("Failed to subscribe: " + (error.message || "Unknown error"));
      }
    }
  }

  if (!isSupported) return null;
  // If they already subscribed, denied permission, dismissed the prompt, or already granted permission (handled silently)
  if (subscription || permissionDenied || isDismissed || (typeof Notification !== 'undefined' && Notification.permission === 'granted')) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 p-4 bg-surface-container-high/90 border border-outline-variant/30 shadow-2xl shadow-black/40 rounded-2xl max-w-[320px] flex items-start gap-4 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="p-2 bg-primary/10 rounded-full shrink-0">
        <BellRing className="w-5 h-5 text-primary" />
      </div>
      <div className="flex flex-col gap-3 flex-1 pr-4">
        <div className="flex flex-col gap-0.5">
          <h4 className="font-bold text-sm text-on-surface">Stay Updated</h4>
          <p className="text-xs text-on-surface-variant font-medium leading-relaxed">Get instantly notified about our architectural insights and projects.</p>
        </div>
        <button 
          onClick={subscribeToPush}
          className="w-full py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_15px_rgba(var(--color-primary),0.4)] text-center"
        >
          Allow Notifications
        </button>
      </div>
      <button 
        onClick={() => setIsDismissed(true)} 
        className="absolute top-2 right-2 text-on-surface-variant/50 hover:text-on-surface transition-colors p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
