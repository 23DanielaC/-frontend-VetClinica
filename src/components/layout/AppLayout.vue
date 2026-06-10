<template>
  <div class="flex h-screen overflow-hidden bg-base">
    <!-- Sidebar -->
    <aside :class="['flex flex-col bg-white border-r border-gray-100 shadow-sm transition-all duration-300 z-30',
      sidebarOpen ? 'w-64' : 'w-16']">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div class="flex-shrink-0 w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <span v-if="sidebarOpen" class="font-bold text-gray-800 text-lg">VetClinica</span>
      </div>

      <!-- Nav links -->
      <nav class="flex-1 overflow-y-auto py-4 px-2 space-y-1">
        <router-link v-for="item in navItems" :key="item.to" :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 group"
          :class="$route.path === item.to
            ? 'bg-primary text-white shadow-sm'
            : 'text-gray-500 hover:bg-blue-50 hover:text-primary'">
          <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
          <span v-if="sidebarOpen" class="truncate">{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- User -->
      <div class="px-3 py-4 border-t border-gray-100">
        <button @click="logout" class="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
          <ArrowRightOnRectangleIcon class="w-5 h-5 flex-shrink-0" />
          <span v-if="sidebarOpen">Cerrar sesión</span>
        </button>
      </div>
    </aside>

    <!-- Main area -->
    <div class="flex flex-col flex-1 overflow-hidden">
      <!-- Navbar -->
      <header class="bg-white border-b border-gray-100 shadow-sm px-4 py-3 flex items-center gap-4">
        <button @click="sidebarOpen = !sidebarOpen" class="p-1.5 rounded-lg hover:bg-base text-gray-500 transition-colors">
          <Bars3Icon class="w-5 h-5" />
        </button>
        <div class="flex-1">
          <h1 class="text-base font-semibold text-gray-700">{{ currentTitle }}</h1>
        </div>
        <div class="flex items-center gap-3">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-medium text-gray-700">{{ auth.user?.name }}</p>
            <p class="text-xs text-gray-400">{{ auth.user?.role }}</p>
          </div>
          <div class="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
            {{ auth.user?.name?.[0] ?? 'A' }}
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  HomeIcon, UsersIcon, HeartIcon, UserGroupIcon,
  CalendarDaysIcon, ClipboardDocumentListIcon, BeakerIcon,
  ShieldCheckIcon, DocumentTextIcon, CreditCardIcon,
  Bars3Icon, ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const sidebarOpen = ref(true)

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',      icon: HomeIcon },
  { to: '/clientes',      label: 'Clientes',        icon: UsersIcon },
  { to: '/mascotas',      label: 'Mascotas',        icon: HeartIcon },
  { to: '/veterinarios',  label: 'Veterinarios',    icon: UserGroupIcon },
  { to: '/turnos',        label: 'Turnos',          icon: CalendarDaysIcon },
  { to: '/consultas',     label: 'Consultas',       icon: ClipboardDocumentListIcon },
  { to: '/medicamentos',  label: 'Medicamentos',    icon: BeakerIcon },
  { to: '/vacunas',       label: 'Vacunas',         icon: ShieldCheckIcon },
  { to: '/facturas',      label: 'Facturas',        icon: DocumentTextIcon },
  { to: '/pagos',         label: 'Pagos',           icon: CreditCardIcon },
]

const currentTitle = computed(() => navItems.find(n => n.to === route.path)?.label ?? 'VetNova')

function logout() {
  auth.logout()
  router.push('/login')
}
</script>
