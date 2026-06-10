<template>
  <div class="space-y-4">
    <CrudTable title="consulta" :columns="cols" :rows="data.consultas" :search-keys="['diagnostico','tratamiento']"
      @add="openModal()" @edit="openModal($event)" @delete="del($event)">
      <template #cell-turnoId="{ row }">Turno #{{ row.turnoId }}</template>
    </CrudTable>
    <CrudModal v-model="showModal" :title="editing ? 'Editar Consulta' : 'Nueva Consulta'" @confirm="save">
      <div class="space-y-4">
        <div><label class="form-label">Turno relacionado</label>
          <select v-model="form.turnoId" class="form-input">
            <option v-for="t in data.turnos" :key="t.id" :value="t.id">
              {{ t.fecha }} {{ t.hora }} – {{ clienteNombre(t.clienteId) }}
            </option>
          </select>
        </div>
        <div><label class="form-label">Fecha</label><input v-model="form.fecha" type="date" class="form-input" /></div>
        <div><label class="form-label">Diagnóstico</label><textarea v-model="form.diagnostico" class="form-input" rows="3" /></div>
        <div><label class="form-label">Tratamiento</label><textarea v-model="form.tratamiento" class="form-input" rows="3" /></div>
        <div><label class="form-label">Observaciones</label><textarea v-model="form.observaciones" class="form-input" rows="2" /></div>
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
const blank = () => ({ turnoId: data.turnos[0]?.id ?? '', fecha: new Date().toISOString().slice(0,10), diagnostico: '', tratamiento: '', observaciones: '' })
const form = ref(blank())

const cols = [
  { key: 'fecha', label: 'Fecha' }, { key: 'turnoId', label: 'Turno' },
  { key: 'diagnostico', label: 'Diagnóstico' }, { key: 'tratamiento', label: 'Tratamiento' },
]

function clienteNombre(id) { return data.clientes.find(c => c.id === id)?.nombre ?? id }
function openModal(row = null) { editing.value = row; form.value = row ? { ...row } : blank(); showModal.value = true }
function save() {
  if (editing.value) data.updateItem(data.consultas, editing.value.id, form.value)
  else data.addItem(data.consultas, form.value)
  showModal.value = false
}
function del(row) { if (confirm('¿Eliminar consulta?')) data.deleteItem(data.consultas, row.id) }
</script>
