﻿namespace TaskBoardApplication.Models
{
    public class HomeViewModel
    {
        public int AllTasksCount { get; init; }

        public List<HomeBoardModel> BoardWithTasksCount { get; init; }

        public int UserTasksCount { get; init; }
    }
}
