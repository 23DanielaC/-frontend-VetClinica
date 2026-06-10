import { defineStore } from 'pinia'
import { ref } from 'vue'

const makeId = () => Date.now() + Math.random().toString(36).slice(2)

export const useDataStore = defineStore('data', () => {
  // ── Clientes ──────────────────────────────────────────────
  const clientes = ref([
    { id: '1', nombre: 'María García', telefono: '555-0101', email: 'maria@email.com', direccion: 'Calle 10 #5-20', fechaRegistro: '2024-01-15' },
    { id: '2', nombre: 'Carlos López', telefono: '555-0202', email: 'carlos@email.com', direccion: 'Carrera 7 #80-40', fechaRegistro: '2024-02-20' },
    { id: '3', nombre: 'Ana Martínez', telefono: '555-0303', email: 'ana@email.com', direccion: 'Av. 68 #12-30', fechaRegistro: '2024-03-05' },
  ])

  // ── Mascotas ──────────────────────────────────────────────
  const mascotas = ref([
    { id: '1', nombre: 'Max', especie: 'Perro', raza: 'Labrador', edad: 3, peso: 28.5, clienteId: '1', fechaNacimiento: '2021-04-10' },
    { id: '2', nombre: 'Luna', especie: 'Gato', raza: 'Siamés', edad: 2, peso: 4.2, clienteId: '1', fechaNacimiento: '2022-06-15' },
    { id: '3', nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog', edad: 5, peso: 22.0, clienteId: '2', fechaNacimiento: '2019-11-20' },
  ])

  // ── Veterinarios ──────────────────────────────────────────
  const veterinarios = ref([
    { id: '1', nombre: 'Dr. Andrés Pérez', especialidad: 'Cirugía', telefono: '555-1001', email: 'andres@vetnova.com', matricula: 'VET-001' },
    { id: '2', nombre: 'Dra. Laura Sánchez', especialidad: 'Dermatología', telefono: '555-1002', email: 'laura@vetnova.com', matricula: 'VET-002' },
    { id: '3', nombre: 'Dr. Roberto Torres', especialidad: 'Medicina General', telefono: '555-1003', email: 'roberto@vetnova.com', matricula: 'VET-003' },
  ])

  // ── Turnos ────────────────────────────────────────────────
  const turnos = ref([
    { id: '1', clienteId: '1', mascotaId: '1', veterinarioId: '1', fecha: '2024-06-10', hora: '09:00', motivo: 'Control anual', estado: 'Confirmado' },
    { id: '2', clienteId: '2', mascotaId: '3', veterinarioId: '3', fecha: '2024-06-11', hora: '10:30', motivo: 'Vacunación', estado: 'Pendiente' },
    { id: '3', clienteId: '3', mascotaId: '2', veterinarioId: '2', fecha: '2024-06-12', hora: '14:00', motivo: 'Revisión piel', estado: 'Confirmado' },
  ])

  // ── Consultas ─────────────────────────────────────────────
  const consultas = ref([
    { id: '1', turnoId: '1', diagnostico: 'Animal sano, en buen estado', tratamiento: 'Ninguno', observaciones: 'Control en 6 meses', fecha: '2024-05-10' },
    { id: '2', turnoId: '2', diagnostico: 'Otitis leve', tratamiento: 'Gotas óticas x 7 días', observaciones: 'Revisión en 1 semana', fecha: '2024-05-15' },
  ])

  // ── Medicamentos ──────────────────────────────────────────
  const medicamentos = ref([
    { id: '1', nombre: 'Amoxicilina', presentacion: 'Comprimidos', dosis: '250mg', stock: 50, precio: 12500, proveedor: 'FarmVet' },
    { id: '2', nombre: 'Ivermectina', presentacion: 'Inyectable', dosis: '1%', stock: 30, precio: 8500, proveedor: 'VetPharma' },
    { id: '3', nombre: 'Prednisolona', presentacion: 'Comprimidos', dosis: '5mg', stock: 45, precio: 9800, proveedor: 'FarmVet' },
  ])

  // ── Vacunas ───────────────────────────────────────────────
  const vacunas = ref([
    { id: '1', nombre: 'Rabia', especie: 'Perro/Gato', laboratorio: 'Zoetis', lote: 'L-2024-01', vencimiento: '2025-12-01', stock: 20, precio: 35000 },
    { id: '2', nombre: 'Parvovirus', especie: 'Perro', laboratorio: 'MSD Animal Health', lote: 'L-2024-02', vencimiento: '2025-10-15', stock: 15, precio: 28000 },
    { id: '3', nombre: 'Leucemia Felina', especie: 'Gato', laboratorio: 'Boehringer', lote: 'L-2024-03', vencimiento: '2025-11-20', stock: 10, precio: 42000 },
  ])

  // ── Facturas ──────────────────────────────────────────────
  const facturas = ref([
    { id: '1', clienteId: '1', fecha: '2024-05-10', subtotal: 85000, iva: 16150, total: 101150, estado: 'Pagada' },
    { id: '2', clienteId: '2', fecha: '2024-05-15', subtotal: 62000, iva: 11780, total: 73780, estado: 'Pendiente' },
    { id: '3', clienteId: '3', fecha: '2024-05-20', subtotal: 120000, iva: 22800, total: 142800, estado: 'Pagada' },
  ])

  // ── Pagos ─────────────────────────────────────────────────
  const pagos = ref([
    { id: '1', facturaId: '1', monto: 101150, metodo: 'Tarjeta', fecha: '2024-05-10', referencia: 'TXN-001' },
    { id: '2', facturaId: '3', monto: 142800, metodo: 'Efectivo', fecha: '2024-05-20', referencia: 'TXN-002' },
  ])

  // ── Helpers CRUD genérico ─────────────────────────────────
  function addItem(collection, item) { collection.value.push({ ...item, id: makeId() }) }
  function updateItem(collection, id, data) {
    const i = collection.value.findIndex(x => x.id === id)
    if (i !== -1) collection.value[i] = { ...collection.value[i], ...data }
  }
  function deleteItem(collection, id) {
    const i = collection.value.findIndex(x => x.id === id)
    if (i !== -1) collection.value.splice(i, 1)
  }

  return {
    clientes, mascotas, veterinarios, turnos, consultas,
    medicamentos, vacunas, facturas, pagos,
    addItem, updateItem, deleteItem
  }
})
