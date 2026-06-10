<template>
  <div class="space-y-4">
    <CrudTable title="medicamento" :columns="cols" :rows="data.medicamentos" :search-keys="['nombre','presentacion','proveedor']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-precio="{ row }">${{ row.precio.toLocaleString() }}</template>
      <template #cell-stock="{ row }">
        <span :class="row.stock < 10 ? 'badge bg-red-100 text-red-600' : row.stock < 20 ? 'badge bg-yellow-100 text-yellow-700' : 'badge bg-green-100 text-green-700'">{{ row.stock }}</span>
      </template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Medicamento' : 'Nuevo Medicamento'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Nombre</label><input v-model="form.nombre" class="form-input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Presentación</label>
            <select v-model="form.presentacion" class="form-input">
              <option>Comprimidos</option><option>Inyectable</option><option>Jarabe</option><option>Crema</option><option>Gotas</option>
            </select>
          </div>
          <div><label class="form-label">Dosis</label><input v-model="form.dosis" class="form-input" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Stock</label><input v-model.number="form.stock" type="number" class="form-input" /></div>
          <div><label class="form-label">Precio ($)</label><input v-model.number="form.precio" type="number" class="form-input" /></div>
        </div>
        <div><label class="form-label">Proveedor</label><input v-model="form.proveedor" class="form-input" /></div>
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
const blank = () => ({ nombre: '', presentacion: 'Comprimidos', dosis: '', stock: 0, precio: 0, proveedor: '' })
const form = ref(blank())

const cols = [
  { key: 'nombre', label: 'Nombre' }, { key: 'presentacion', label: 'Presentación' },
  { key: 'dosis', label: 'Dosis' }, { key: 'stock', label: 'Stock' },
  { key: 'precio', label: 'Precio' }, { key: 'proveedor', label: 'Proveedor' },
]

function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.medicamentos, editing.value.id, form.value)
  else data.addItem(data.medicamentos, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar medicamento?')) data.deleteItem(data.medicamentos, row.id) }
</script>
