using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskBoardApplication.Data;
using TaskBoardApplication.Data.Entities;
using TaskBoardApplication.Models;

namespace TaskBoardApplication.Controllers
{
    public class HomeController : Controller
    {

        private readonly TaskBoardAppDbContext data;

        public HomeController(TaskBoardAppDbContext context)
        {
            this.data = context;
        }

        public IActionResult Index()
        {
            var taskBoards = data.Boards
                .Select(b => b.Name)
                .Distinct();

            var taskCounts = new List<HomeBoardModel>();

            foreach (var boardName in taskBoards)
            {
                var taskInBoard = data.Tasks.Where(t => t.Board.Name == boardName).Count();
                taskCounts.Add(new HomeBoardModel()
                {
                    BoardName = boardName,
                    TasksCount = taskInBoard
                });
            }

            var userTaskCount = -1;
            
            if (this.User.Identity.IsAuthenticated)
            {
                var currentUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                userTaskCount = this.data.Tasks.Where(t => t.OwnerId == currentUserId).Count();
            }

            var homeModel = new HomeViewModel()
            {
                AllTasksCount = this.data.Tasks.Count(),
                BoardWithTasksCount = taskCounts,
                UserTasksCount = userTaskCount
            };

            return View(homeModel);
        }

       
    }
}