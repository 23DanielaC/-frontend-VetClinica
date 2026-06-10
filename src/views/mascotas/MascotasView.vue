<template>
  <div class="space-y-4">
    <CrudTable title="mascota" :columns="cols" :rows="data.mascotas" :search-keys="['nombre','especie','raza']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-clienteId="{ row }">
        {{ clienteNombre(row.clienteId) }}
      </template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Mascota' : 'Nueva Mascota'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Nombre</label><input v-model="form.nombre" class="form-input" /></div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Especie</label>
            <select v-model="form.especie" class="form-input">
              <option>Perro</option><option>Gato</option><option>Ave</option><option>Conejo</option><option>Otro</option>
            </select>
          </div>
          <div><label class="form-label">Raza</label><input v-model="form.raza" class="form-input" /></div>
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div><label class="form-label">Edad (años)</label><input v-model.number="form.edad" type="number" class="form-input" /></div>
          <div><label class="form-label">Peso (kg)</label><input v-model.number="form.peso" type="number" step="0.1" class="form-input" /></div>
        </div>
        <div><label class="form-label">Fecha de nacimiento</label><input v-model="form.fechaNacimiento" type="date" class="form-input" /></div>
        <div><label class="form-label">Propietario</label>
          <select v-model="form.clienteId" class="form-input">
            <option v-for="c in data.clientes" :key="c.id" :value="c.id">{{ c.nombre }}</option>
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
const blank = () => ({ nombre: '', especie: 'Perro', raza: '', edad: 1, peso: 0, fechaNacimiento: '', clienteId: data.clientes[0]?.id ?? '' })
const form = ref(blank())

const cols = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'especie', label: 'Especie' },
  { key: 'raza', label: 'Raza' },
  { key: 'edad', label: 'Edad' },
  { key: 'peso', label: 'Peso (kg)' },
  { key: 'clienteId', label: 'Propietario' },
]

function clienteNombre(id) { return data.clientes.find(c => c.id === id)?.nombre ?? id }
function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.mascotas, editing.value.id, form.value)
  else data.addItem(data.mascotas, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar mascota?')) data.deleteItem(data.mascotas, row.id) }
</script>
