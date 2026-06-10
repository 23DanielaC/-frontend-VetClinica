<template>
  <Teleport to="body">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" @mousedown.self="$emit('update:modelValue', false)">
      <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
          <button @click="$emit('update:modelValue', false)" class="p-1 rounded-lg hover:bg-base text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
        <div class="overflow-y-auto px-6 py-4 flex-1">
          <slot />
        </div>
        <div class="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">
          <button @click="$emit('update:modelValue', false)" class="btn-secondary">Cancelar</button>
          <button @click="$emit('confirm')" class="btn-primary">{{ confirmLabel }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { XMarkIcon } from '@heroicons/vue/24/outline'
defineProps({ modelValue: Boolean, title: String, confirmLabel: { default: 'Guardar' } })
defineEmits(['update:modelValue', 'confirm'])
</script>
