// TODO: call /tools api to get options, and this model can be removed
export const Tools = {
  NO_HELP: '自行判斷',
  HDA: '連結程度',
  HCA: '距離長短',
  HBA: '中介程度',
  HPRA: '重要程度',
  FINDER: 'AI_FINDER',
}

export const toolsAvailable = {
  NO_HELP: {
    code: 0,
    displayName: '自行判斷',
    introduction: '代表...',
  },
  HDA: {
    code: 1,
    displayName: '連結程度',
    introduction: '代表...',
  },
  HCA: {
    code: 2,
    displayName: '距離長短',
    introduction: '代表...',
  },
  HBA: {
    code: 3,
    displayName: '中介程度',
    introduction: '代表...',
  },
  HPRA: {
    code: 4,
    displayName: '重要程度',
    introduction: '代表...',
  },
  FINDER: {
    code: 5,
    displayName: 'AI_FINDER',
    introduction: '代表...',
  },
}
