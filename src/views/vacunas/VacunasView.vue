<template>
  <div class="space-y-4">
    <CrudTable title="vacuna" :columns="cols" :rows="data.vacunas" :search-keys="['nombre','especie','laboratorio']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-precio="{ row }">${{ row.precio.toLocaleString() }}</template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Vacuna' : 'Nueva Vacuna'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Nombre</label><input v-model="form.nombre" class="form-input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Especie</label>
            <select v-model="form.especie" class="form-input">
              <option>Perro</option><option>Gato</option><option>Perro/Gato</option><option>Ave</option>
            </select>
          </div>
          <div><label class="form-label">Laboratorio</label><input v-model="form.laboratorio" class="form-input" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Lote</label><input v-model="form.lote" class="form-input" /></div>
          <div><label class="form-label">Vencimiento</label><input v-model="form.vencimiento" type="date" class="form-input" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Stock</label><input v-model.number="form.stock" type="number" class="form-input" /></div>
          <div><label class="form-label">Precio ($)</label><input v-model.number="form.precio" type="number" class="form-input" /></div>
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
const blank = () => ({ nombre: '', especie: 'Perro', laboratorio: '', lote: '', vencimiento: '', stock: 0, precio: 0 })
const form = ref(blank())

const cols = [
  { key: 'nombre', label: 'Nombre' }, { key: 'especie', label: 'Especie' },
  { key: 'laboratorio', label: 'Laboratorio' }, { key: 'lote', label: 'Lote' },
  { key: 'vencimiento', label: 'Vencimiento' }, { key: 'stock', label: 'Stock' },
  { key: 'precio', label: 'Precio' },
]

function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.vacunas, editing.value.id, form.value)
  else data.addItem(data.vacunas, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar vacuna?')) data.deleteItem(data.vacunas, row.id) }
</script>
