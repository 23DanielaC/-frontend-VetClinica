<template>
  <div class="space-y-4">
    <CrudTable title="turno" :columns="cols" :rows="data.turnos" :search-keys="['motivo','estado']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-clienteId="{ row }">{{ clienteNombre(row.clienteId) }}</template>
      <template #cell-mascotaId="{ row }">{{ mascotaNombre(row.mascotaId) }}</template>
      <template #cell-veterinarioId="{ row }">{{ vetNombre(row.veterinarioId) }}</template>
      <template #cell-estado="{ row }">
        <span :class="estadoClass(row.estado)">{{ row.estado }}</span>
      </template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Turno' : 'Nuevo Turno'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Cliente</label>
          <select v-model="form.clienteId" class="form-input">
            <option v-for="c in data.clientes" :key="c.id" :value="c.id">{{ c.nombre }}</option>
          </select>
        </div>
        <div><label class="form-label">Mascota</label>
          <select v-model="form.mascotaId" class="form-input">
            <option v-for="m in data.mascotas" :key="m.id" :value="m.id">{{ m.nombre }}</option>
          </select>
        </div>
        <div><label class="form-label">Veterinario</label>
          <select v-model="form.veterinarioId" class="form-input">
            <option v-for="v in data.veterinarios" :key="v.id" :value="v.id">{{ v.nombre }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Fecha</label><input v-model="form.fecha" type="date" class="form-input" /></div>
          <div><label class="form-label">Hora</label><input v-model="form.hora" type="time" class="form-input" /></div>
        </div>
        <div><label class="form-label">Motivo</label><input v-model="form.motivo" class="form-input" /></div>
        <div><label class="form-label">Estado</label>
          <select v-model="form.estado" class="form-input">
            <option>Pendiente</option><option>Confirmado</option><option>En curso</option><option>Completado</option><option>Cancelado</option>
          </select>
        </div>
      </div>
    </CrudModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDataStore } from '@/stores/data'
import CrudTable from '@/components/ui/CrudTable.vue'
import CrudModal from '@/components/ui/CrudModal.vue'

const data = useDataStore()
const showModal = ref(false)
const editing = ref(null)
const blank = () => ({ clienteId: data.clientes[0]?.id ?? '', mascotaId: data.mascotas[0]?.id ?? '', veterinarioId: data.veterinarios[0]?.id ?? '', fecha: new Date().toISOString().slice(0,10), hora: '09:00', motivo: '', estado: 'Pendiente' })
const form = ref(blank())

const cols = [
  { key: 'fecha', label: 'Fecha' }, { key: 'hora', label: 'Hora' },
  { key: 'clienteId', label: 'Cliente' }, { key: 'mascotaId', label: 'Mascota' },
  { key: 'veterinarioId', label: 'Veterinario' }, { key: 'motivo', label: 'Motivo' },
  { key: 'estado', label: 'Estado' },
]

function clienteNombre(id) { return data.clientes.find(c => c.id === id)?.nombre ?? id }
function mascotaNombre(id) { return data.mascotas.find(m => m.id === id)?.nombre ?? id }
function vetNombre(id) { return data.veterinarios.find(v => v.id === id)?.nombre ?? id }
function estadoClass(e) {
  const m = { Pendiente: 'badge bg-yellow-100 text-yellow-700', Confirmado: 'badge bg-blue-100 text-blue-700', 'En curso': 'badge bg-purple-100 text-purple-700', Completado: 'badge bg-green-100 text-green-700', Cancelado: 'badge bg-red-100 text-red-600' }
  return m[e] ?? 'badge bg-gray-100 text-gray-600'
}
function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.turnos, editing.value.id, form.value)
  else data.addItem(data.turnos, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar turno?')) data.deleteItem(data.turnos, row.id) }
</script>
