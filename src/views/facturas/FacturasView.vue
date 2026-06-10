<template>
  <div class="space-y-4">
    <CrudTable title="factura" :columns="cols" :rows="data.facturas" :search-keys="['estado']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-clienteId="{ row }">{{ clienteNombre(row.clienteId) }}</template>
      <template #cell-subtotal="{ row }">${{ row.subtotal.toLocaleString() }}</template>
      <template #cell-total="{ row }">${{ row.total.toLocaleString() }}</template>
      <template #cell-estado="{ row }">
        <span :class="row.estado === 'Pagada' ? 'badge bg-green-100 text-green-700' : 'badge bg-yellow-100 text-yellow-700'">{{ row.estado }}</span>
      </template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Factura' : 'Nueva Factura'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Cliente</label>
          <select v-model="form.clienteId" class="form-input">
            <option v-for="c in data.clientes" :key="c.id" :value="c.id">{{ c.nombre }}</option>
          </select>
        </div>
        <div><label class="form-label">Fecha</label><input v-model="form.fecha" type="date" class="form-input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Subtotal ($)</label><input v-model.number="form.subtotal" type="number" class="form-input" @input="calcTotal" /></div>
          <div><label class="form-label">IVA ($)</label><input v-model.number="form.iva" type="number" class="form-input" @input="calcTotal" /></div>
        </div>
        <div><label class="form-label">Total ($)</label><input :value="form.total" class="form-input bg-gray-50" readonly /></div>
        <div><label class="form-label">Estado</label>
          <select v-model="form.estado" class="form-input">
            <option>Pendiente</option><option>Pagada</option><option>Anulada</option>
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
const blank = () => ({ clienteId: data.clientes[0]?.id ?? '', fecha: new Date().toISOString().slice(0,10), subtotal: 0, iva: 0, total: 0, estado: 'Pendiente' })
const form = ref(blank())

const cols = [
  { key: 'fecha', label: 'Fecha' }, { key: 'clienteId', label: 'Cliente' },
  { key: 'subtotal', label: 'Subtotal' }, { key: 'total', label: 'Total' }, { key: 'estado', label: 'Estado' },
]

function calcTotal() { form.value.total = (form.value.subtotal || 0) + (form.value.iva || 0) }
function clienteNombre(id) { return data.clientes.find(c => c.id === id)?.nombre ?? id }
function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.facturas, editing.value.id, form.value)
  else data.addItem(data.facturas, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar factura?')) data.deleteItem(data.facturas, row.id) }
</script>
