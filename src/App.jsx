import React, { useState } from 'react'
import Landing from './components/Landing'
import Modal from './components/Modal'
import RegistrationForm from './components/RegistrationForm'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-stone-50">
      <Landing onRegister={() => setModalOpen(true)} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <RegistrationForm onClose={() => setModalOpen(false)} />
      </Modal>
    </div>
  )
}
