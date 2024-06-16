export function getExample1GraphData() {
  return {
    nodes: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }, { id: '7' }, { id: '8' }],
    links: [
      { source: '1', target: '2' },
      { source: '1', target: '3' },
      { source: '1', target: '4' },
      { source: '2', target: '3' },
      { source: '2', target: '4' },
      { source: '3', target: '4' },
      { source: '4', target: '5' },
      { source: '5', target: '6' },
      { source: '5', target: '7' },
      { source: '5', target: '8' },
      { source: '6', target: '7' },
      { source: '6', target: '8' },
      { source: '7', target: '8' },
    ],
  }
}
