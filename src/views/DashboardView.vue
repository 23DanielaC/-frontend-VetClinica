<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold text-gray-800">Bienvenido, {{ auth.user?.name }} 👋</h2>
      <p class="text-gray-500 mt-1">Resumen general del sistema</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard :icon="UsersIcon"              label="Clientes"      :value="data.clientes.length"     color-class="bg-primary" />
      <StatCard :icon="HeartIcon"              label="Mascotas"      :value="data.mascotas.length"     color-class="bg-pink-400" />
      <StatCard :icon="UserGroupIcon"          label="Veterinarios"  :value="data.veterinarios.length" color-class="bg-violet-400" />
      <StatCard :icon="CalendarDaysIcon"       label="Turnos Hoy"    :value="turnosHoy"                color-class="bg-accent-dark" />
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard :icon="ClipboardDocumentListIcon" label="Consultas"    :value="data.consultas.length"    color-class="bg-teal-400" />
      <StatCard :icon="BeakerIcon"                label="Medicamentos" :value="data.medicamentos.length" color-class="bg-orange-400" />
      <StatCard :icon="ShieldCheckIcon"           label="Vacunas"      :value="data.vacunas.length"      color-class="bg-green-400" />
      <StatCard :icon="DocumentTextIcon"          label="Facturas"     :value="data.facturas.length"     color-class="bg-indigo-400" />
    </div>

    <!-- Recent activity -->
    <div class="grid md:grid-cols-2 gap-6">
      <!-- Próximos turnos -->
      <div class="card">
        <h3 class="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CalendarDaysIcon class="w-5 h-5 text-primary" /> Próximos Turnos
        </h3>
        <div class="space-y-3">
          <div v-for="t in proximos" :key="t.id" class="flex items-center justify-between p-3 bg-base rounded-xl">
            <div>
              <p class="text-sm font-medium text-gray-700">{{ clienteNombre(t.clienteId) }}</p>
              <p class="text-xs text-gray-400">{{ mascotaNombre(t.mascotaId) }} · {{ t.motivo }}</p>
            </div>
            <div class="text-right">
              <p class="text-xs font-semibold text-primary">{{ t.hora }}</p>
              <p class="text-xs text-gray-400">{{ t.fecha }}</p>
            </div>
          </div>
          <p v-if="!proximos.length" class="text-sm text-gray-400 text-center py-4">Sin turnos programados</p>
        </div>
      </div>

      <!-- Stock bajo -->
      <div class="card">
        <h3 class="font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <BeakerIcon class="w-5 h-5 text-orange-400" /> Medicamentos con Bajo Stock
        </h3>
        <div class="space-y-3">
          <div v-for="m in bajosStock" :key="m.id" class="flex items-center justify-between p-3 bg-base rounded-xl">
            <div>
              <p class="text-sm font-medium text-gray-700">{{ m.nombre }}</p>
              <p class="text-xs text-gray-400">{{ m.presentacion }}</p>
            </div>
            <span :class="m.stock < 10 ? 'badge bg-red-100 text-red-600' : 'badge bg-yellow-100 text-yellow-700'">
              {{ m.stock }} und.
            </span>
          </div>
          <p v-if="!bajosStock.length" class="text-sm text-gray-400 text-center py-4">Stock en buen nivel</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useDataStore } from '@/stores/data'
import StatCard from '@/components/ui/StatCard.vue'
import {
  UsersIcon, HeartIcon, UserGroupIcon, CalendarDaysIcon,
  ClipboardDocumentListIcon, BeakerIcon, ShieldCheckIcon, DocumentTextIcon
} from '@heroicons/vue/24/outline'

const auth = useAuthStore()
const data = useDataStore()

const turnosHoy = computed(() => {
  const hoy = new Date().toISOString().slice(0, 10)
  return data.turnos.filter(t => t.fecha === hoy).length
})

const proximos = computed(() => data.turnos.slice(0, 4))
const bajosStock = computed(() => data.medicamentos.filter(m => m.stock < 20))

function clienteNombre(id) { return data.clientes.find(c => c.id === id)?.nombre ?? id }
function mascotaNombre(id) { return data.mascotas.find(m => m.id === id)?.nombre ?? id }
</script>
