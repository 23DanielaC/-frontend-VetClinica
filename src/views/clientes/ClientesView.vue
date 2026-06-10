<template>
  <div class="space-y-4">
    <CrudTable title="cliente" :columns="cols" :rows="data.clientes" :search-keys="['nombre','email','telefono']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)" />
    <CrudModal v-model="showModal" :title="editing ? 'Editar Cliente' : 'Nuevo Cliente'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Nombre completo</label><input v-model="form.nombre" class="form-input" /></div>
        <div><label class="form-label">Teléfono</label><input v-model="form.telefono" class="form-input" /></div>
        <div><label class="form-label">Email</label><input v-model="form.email" type="email" class="form-input" /></div>
        <div><label class="form-label">Dirección</label><input v-model="form.direccion" class="form-input" /></div>
        <div><label class="form-label">Fecha de Registro</label><input v-model="form.fechaRegistro" type="date" class="form-input" /></div>
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
const blank = () => ({ nombre: '', telefono: '', email: '', direccion: '', fechaRegistro: new Date().toISOString().slice(0,10) })
const form = ref(blank())

const cols = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'email', label: 'Email' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'fechaRegistro', label: 'Registro' },
]

function openModal(row = null) {
  editing.value = row
  form.value = row ? { ...row } : blank()
  showModal.value = true
}
function save() {
  if (editing.value) data.updateItem(data.clientes, editing.value.id, form.value)
  else data.addItem(data.clientes, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar cliente?')) data.deleteItem(data.clientes, row.id) }
</script>
