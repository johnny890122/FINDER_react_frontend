export const example1GraphData = {
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

export const example1StepsConfig = {
  0: {
    id: '1',
    text: '下面有一個網絡，首先請試試移除編號 #5 的點，看看結果如何？',
    nodeIdToBeRemoved: '5',
  },
  1: {
    id: '2',
    text: '這次，請移除編號 #8 的點，看看結果如何？',
    nodeIdToBeRemoved: '8',
  },
}
