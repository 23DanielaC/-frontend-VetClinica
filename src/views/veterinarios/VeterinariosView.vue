<template>
  <div class="space-y-4">
    <CrudTable title="veterinario" :columns="cols" :rows="data.veterinarios" :search-keys="['nombre','especialidad','matricula']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)" />
    <CrudModal v-model="showModal" :title="editing ? 'Editar Veterinario' : 'Nuevo Veterinario'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Nombre completo</label><input v-model="form.nombre" class="form-input" /></div>
        <div><label class="form-label">Especialidad</label>
          <select v-model="form.especialidad" class="form-input">
            <option>Medicina General</option><option>Cirugía</option><option>Dermatología</option>
            <option>Cardiología</option><option>Oncología</option><option>Oftalmología</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Teléfono</label><input v-model="form.telefono" class="form-input" /></div>
          <div><label class="form-label">Matrícula</label><input v-model="form.matricula" class="form-input" /></div>
        </div>
        <div><label class="form-label">Email</label><input v-model="form.email" type="email" class="form-input" /></div>
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
const blank = () => ({ nombre: '', especialidad: 'Medicina General', telefono: '', email: '', matricula: '' })
const form = ref(blank())

const cols = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'especialidad', label: 'Especialidad' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
  { key: 'matricula', label: 'Matrícula' },
]

function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.veterinarios, editing.value.id, form.value)
  else data.addItem(data.veterinarios, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar veterinario?')) data.deleteItem(data.veterinarios, row.id) }
</script>
