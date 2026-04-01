<script setup>
import { computed, ref } from 'vue';
const shapes = ref([]);
const selectedId = ref(null);
const selected = computed(() => shapes.value.find((s) => s.id === selectedId.value));
const add = (type) => { const s = { id: crypto.randomUUID(), type, x: 260, y: 160, width: 120, height: 120, rotation: 0, stroke: '#ff5f5f', fill: '#ff5f5f', fillOpacity: 0.15, cornerRadius: 12 }; shapes.value.push(s); selectedId.value = s.id; };
</script>

<template>
  <div>
    <div style="display:flex;gap:8px;margin-bottom:8px;">
      <button @click="add('rect')">rect</button><button @click="add('circle')">circle</button><button @click="add('triangle')">triangle</button>
      <input v-if="selected" type="color" v-model="selected.stroke" />
    </div>
    <svg width="100%" height="320" viewBox="0 0 520 320" style="background:#151515;">
      <g v-for="shape in shapes" :key="shape.id" :transform="`translate(${shape.x} ${shape.y}) rotate(${shape.rotation})`" @mousedown="selectedId = shape.id">
        <ellipse v-if="shape.type==='circle'" :rx="shape.width/2" :ry="shape.height/2" :fill="shape.fill" :fill-opacity="shape.fillOpacity" :stroke="shape.stroke" stroke-width="2" />
        <polygon v-else-if="shape.type==='triangle'" :points="`0,${-shape.height/2} ${shape.width/2},${shape.height/2} ${-shape.width/2},${shape.height/2}`" :fill="shape.fill" :fill-opacity="shape.fillOpacity" :stroke="shape.stroke" stroke-width="2" />
        <rect v-else :x="-shape.width/2" :y="-shape.height/2" :width="shape.width" :height="shape.height" :rx="shape.cornerRadius" :fill="shape.fill" :fill-opacity="shape.fillOpacity" :stroke="shape.stroke" stroke-width="2" />
        <rect v-if="selectedId===shape.id" :x="-shape.width/2" :y="-shape.height/2" :width="shape.width" :height="shape.height" fill="none" stroke="#22c55e" stroke-dasharray="5 4" />
      </g>
    </svg>
  </div>
</template>
