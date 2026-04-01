<script>
  let shapes = [];
  let selectedId = null;
  const add = (type) => {
    const s = { id: crypto.randomUUID(), type, x: 260, y: 160, width: 120, height: 120, rotation: 0, stroke: '#ff5f5f', fill: '#ff5f5f', fillOpacity: 0.15, cornerRadius: 12 };
    shapes = [...shapes, s];
    selectedId = s.id;
  };
</script>

<div style="display:flex;gap:8px;margin-bottom:8px;">
  <button on:click={() => add('rect')}>rect</button>
  <button on:click={() => add('circle')}>circle</button>
  <button on:click={() => add('triangle')}>triangle</button>
  {#if shapes.find((x) => x.id === selectedId)}
    <input type="color" bind:value={shapes.find((x) => x.id === selectedId).stroke} />
  {/if}
</div>
<svg width="100%" height="320" viewBox="0 0 520 320" style="background:#151515;">
  {#each shapes as shape}
    <g transform={`translate(${shape.x} ${shape.y}) rotate(${shape.rotation})`} on:mousedown={() => selectedId = shape.id}>
      {#if shape.type === 'circle'}
        <ellipse rx={shape.width/2} ry={shape.height/2} fill={shape.fill} fill-opacity={shape.fillOpacity} stroke={shape.stroke} stroke-width="2" />
      {:else if shape.type === 'triangle'}
        <polygon points={`0,${-shape.height/2} ${shape.width/2},${shape.height/2} ${-shape.width/2},${shape.height/2}`} fill={shape.fill} fill-opacity={shape.fillOpacity} stroke={shape.stroke} stroke-width="2" />
      {:else}
        <rect x={-shape.width/2} y={-shape.height/2} width={shape.width} height={shape.height} rx={shape.cornerRadius} fill={shape.fill} fill-opacity={shape.fillOpacity} stroke={shape.stroke} stroke-width="2" />
      {/if}
      {#if selectedId === shape.id}
        <rect x={-shape.width/2} y={-shape.height/2} width={shape.width} height={shape.height} fill="none" stroke="#22c55e" stroke-dasharray="5 4" />
      {/if}
    </g>
  {/each}
</svg>
