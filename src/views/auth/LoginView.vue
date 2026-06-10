<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-light via-base to-white flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-lg mb-4">
          <svg class="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800">VetClinica</h1>
        <p class="text-gray-500 mt-1">Sistema de Gestión Veterinaria</p>
      </div>

      <!-- Card -->
      <div class="card">
        <h2 class="text-xl font-semibold text-gray-700 mb-6">Iniciar Sesión</h2>

        <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/></svg>
          {{ error }}
        </div>

        <div class="space-y-4">
          <div>
            <label class="form-label">Correo electrónico</label>
            <input v-model="form.email" type="email" class="form-input" placeholder="admin@vetnova.com" @keyup.enter="handleLogin" />
          </div>
          <div>
            <label class="form-label">Contraseña</label>
            <input v-model="form.password" type="password" class="form-input" placeholder="••••••••" @keyup.enter="handleLogin" />
          </div>
          <button @click="handleLogin" :disabled="loading" class="btn-primary w-full justify-center py-2.5">
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            {{ loading ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </div>

        <div class="mt-6 p-3 bg-blue-50 rounded-lg text-xs text-blue-600">
          <strong>Demo:</strong> admin@vetnova.com / admin123
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const form = ref({ email: 'admin@vetnova.com', password: 'admin123' })
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  await new Promise(r => setTimeout(r, 600))
  const ok = auth.login(form.value)
  loading.value = false
  if (ok) router.push('/dashboard')
  else error.value = 'Correo o contraseña incorrectos'
}
</script>
