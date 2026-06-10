<template>
  <div class="space-y-4">
    <CrudTable title="pago" :columns="cols" :rows="data.pagos" :search-keys="['metodo','referencia']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-facturaId="{ row }">Factura #{{ row.facturaId }}</template>
      <template #cell-monto="{ row }">${{ row.monto.toLocaleString() }}</template>
      <template #cell-metodo="{ row }">
        <span :class="metodoClass(row.metodo)">{{ row.metodo }}</span>
      </template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Pago' : 'Nuevo Pago'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Factura</label>
          <select v-model="form.facturaId" class="form-input">
            <option v-for="f in data.facturas" :key="f.id" :value="f.id">
              #{{ f.id }} – {{ clienteNombre(f.clienteId) }} – ${{ f.total.toLocaleString() }}
            </option>
          </select>
        </div>
        <div><label class="form-label">Monto ($)</label><input v-model.number="form.monto" type="number" class="form-input" /></div>
        <div><label class="form-label">Método de pago</label>
          <select v-model="form.metodo" class="form-input">
            <option>Efectivo</option><option>Tarjeta</option><option>Transferencia</option><option>Cheque</option>
          </select>
        </div>
        <div><label class="form-label">Fecha</label><input v-model="form.fecha" type="date" class="form-input" /></div>
        <div><label class="form-label">Referencia</label><input v-model="form.referencia" class="form-input" /></div>
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
const blank = () => ({ facturaId: data.facturas[0]?.id ?? '', monto: 0, metodo: 'Efectivo', fecha: new Date().toISOString().slice(0,10), referencia: '' })
const form = ref(blank())

const cols = [
  { key: 'fecha', label: 'Fecha' }, { key: 'facturaId', label: 'Factura' },
  { key: 'monto', label: 'Monto' }, { key: 'metodo', label: 'Método' },
  { key: 'referencia', label: 'Referencia' },
]

function clienteNombre(id) {
  const f = data.facturas.find(x => x.id === id)
  return f ? data.clientes.find(c => c.id === f.clienteId)?.nombre ?? '' : ''
}
function metodoClass(m) {
  const map = { Efectivo: 'badge bg-green-100 text-green-700', Tarjeta: 'badge bg-blue-100 text-blue-700', Transferencia: 'badge bg-purple-100 text-purple-700', Cheque: 'badge bg-orange-100 text-orange-700' }
  return map[m] ?? 'badge bg-gray-100 text-gray-600'
}
function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.pagos, editing.value.id, form.value)
  else data.addItem(data.pagos, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar pago?')) data.deleteItem(data.pagos, row.id) }
</script>
