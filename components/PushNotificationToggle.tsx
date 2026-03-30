'use client'

import { useEffect, useState } from 'react'

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)))
}

type PermissionState = NotificationPermission | 'unsupported'

export default function PushNotificationToggle() {
  const [permission, setPermission] = useState<PermissionState>('unsupported')
  const [enabled, setEnabled] = useState(false)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !('Notification' in window)) {
      setPermission('unsupported')
      return
    }

    setPermission(Notification.permission)

    void navigator.serviceWorker
      .register('/sw.js', { updateViaCache: 'none' })
      .then(async (registration) => {
      await registration.update()
      const subscription = await registration.pushManager.getSubscription()
      setEnabled(Boolean(subscription))
    }).catch((error) => {
      console.error('Service worker registration failed:', error)
    })
  }, [])

  const enableNotifications = async () => {
    const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
    if (!publicVapidKey) {
      setMessage('通知鍵が未設定です。管理者設定を確認してください。')
      return
    }

    setBusy(true)
    setMessage('')
    try {
      const perm = await Notification.requestPermission()
      setPermission(perm)
      if (perm !== 'granted') {
        setMessage('通知が許可されませんでした。ブラウザ設定をご確認ください。')
        return
      }

      const registration = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      await registration.update()
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey) as BufferSource,
      })

      const res = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription.toJSON()),
      })

      if (!res.ok) {
        throw new Error('Subscribe API failed')
      }

      setEnabled(true)
      setMessage('毎日の通知を有効にしました。')
    } catch (error) {
      console.error(error)
      setMessage('通知の有効化に失敗しました。時間をおいて再試行してください。')
    } finally {
      setBusy(false)
    }
  }

  const disableNotifications = async () => {
    setBusy(true)
    setMessage('')
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { updateViaCache: 'none' })
      await registration.update()
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        await fetch('/api/push/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ endpoint: subscription.endpoint }),
        })
        await subscription.unsubscribe()
      }

      setEnabled(false)
      setMessage('通知をオフにしました。')
    } catch (error) {
      console.error(error)
      setMessage('通知オフに失敗しました。')
    } finally {
      setBusy(false)
    }
  }

  if (permission === 'unsupported') {
    return (
      <p className="font-sans text-text-secondary/60 text-xs mt-2">
        このブラウザはPush通知に対応していません
      </p>
    )
  }

  if (permission === 'denied') {
    return (
      <p className="font-sans text-text-secondary/70 text-xs mt-2">
        通知がブロックされています。ブラウザのサイト設定から許可してください。
      </p>
    )
  }

  return (
    <div className="mt-4">
      {!enabled ? (
        <button
          onClick={enableNotifications}
          disabled={busy}
          className="w-full py-3 border border-accent/40 rounded font-sans text-sm text-accent hover:bg-accent/10 transition-colors disabled:opacity-50"
        >
          {busy ? '設定中...' : '毎日の通知をオンにする'}
        </button>
      ) : (
        <button
          onClick={disableNotifications}
          disabled={busy}
          className="w-full py-3 border border-text-secondary/30 rounded font-sans text-sm text-text-secondary hover:text-accent transition-colors disabled:opacity-50"
        >
          {busy ? '更新中...' : '通知をオフにする'}
        </button>
      )}

      {message && <p className="font-sans text-text-secondary/70 text-xs mt-2">{message}</p>}
    </div>
  )
}
