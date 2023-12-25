import { TourLayout } from './TourLayout'

export const TourPage1 = () => (
  <TourLayout pageTitle="Lesson 1" nextPagePath="/tour/2">
    <div>
      歡迎來到我們所設計的一個「搗毀密謀網絡」的遊戲！
      <br />
      在以下的遊戲中，我們會呈現某個真實的犯罪或地下組織的關係結構圖（如下），圖裡每一個「點」都代表一個人物，每一條「線」顯示人物之間有著某種合作關係。您的任務是把這些線（關係）給移除，進而搗毀整個組織網絡。
    </div>
    ,
    <div>
      接下來我們透過一個範例來讓您體會一下遊戲的過程！
      <br />
      以下這個網絡圖，展示的是2001年9月11日劫機攻擊美國本土的蓋達組織恐怖份子關係圖。圖中每一個點是一位劫機犯，每一條線顯示他們曾經有通聯紀錄，因此推斷有密謀關係。
      <br />
      現在請您開始每次挑選一個點（人物），直到這個恐怖份子的所有關係被移除為止，達成任務。
      <br />
      請在以下的網絡圖中，挑選一個點，進行移除。您所選取的節點，會以紅色標示。
    </div>
  </TourLayout>
)
