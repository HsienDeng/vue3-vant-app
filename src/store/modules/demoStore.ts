import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDemoStore = defineStore('demo', () => {
  const counter = ref(0)

  const increment = () => {
    counter.value++
  }

  return {
    counter,
    increment
  }
})

