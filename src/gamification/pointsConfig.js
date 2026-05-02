export const POINTS = {
  task_complete: 10,
  task_on_time: 5,
  urgent_task: 15,
  no_rework_week: 50,
  peer_assist: 8,
}

export const STREAK_BONUS = (streak) => Math.min(streak * 2, 20)
