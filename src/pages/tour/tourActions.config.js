import tour1BeforeImage from '../../assets/tour1-before.png'
import tour1AfterImage from '../../assets/tour1-after.png'
import tour2BeforeImage from '../../assets/tour2-before.png'
import tour2AfterImage from '../../assets/tour2-after.png'
import tour3BeforeImage from '../../assets/tour3-before.png'
import tour3AfterImage from '../../assets/tour3-after.png'

export const tourActionsStepsConfig = {
  0: {
    id: '1',
    text: '任務 1：移除編號 #7 的點',
    nodeIdToBeRemoved: '7',
    beforeImage: tour1BeforeImage,
    afterImage: tour1AfterImage,
  },
  1: {
    id: '2',
    text: '任務 2：移除編號 #3 的點',
    nodeIdToBeRemoved: '3',
    beforeImage: tour2BeforeImage,
    afterImage: tour2AfterImage,
  },
  2: {
    id: '3',
    text: '任務 3：移除編號 #13 的點',
    nodeIdToBeRemoved: '13',
    beforeImage: tour3BeforeImage,
    afterImage: tour3AfterImage,
  },
}
