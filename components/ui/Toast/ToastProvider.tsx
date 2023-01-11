import { ToastContext } from '@lib/hooks/use-toast'
import { useCallback, useState } from 'react'
import ToastContainer from './ToastContainer'

let id = 0

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<TToast[]>([])

  const addToast = useCallback(
    (content) => {
      setToasts((toasts) => [...toasts, { id: id++, content }])
    },
    [setToasts]
  )

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((t) => t.id !== id))
    },
    [setToasts]
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      <ToastContainer toasts={toasts} />
      {children}
    </ToastContext.Provider>
  )
}

export default ToastProvider
