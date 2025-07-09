// 全ての実績を表示
import React, { useContext } from 'react'
import { AchieveContext } from '../context/AchieveContext';

const ViewAchievements = () => {
  const achieveContext = useContext(AchieveContext);

    if (!achieveContext) {
        throw new Error(
            'AchieveContext is undefined. Make sure to use AchieveProvider.',
        );
    }

    const { achievement } = achieveContext;

    console.log("Achievement:", achievement)

  return (
    <div>

    </div>
  )
}

export default ViewAchievements