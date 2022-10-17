using Microsoft.AspNetCore.Mvc;
using TaskBoardApplication.Data;
using TaskBoardApplication.Models;
using TaskBoardApplication.Models.Tasks;

namespace TaskBoardApplication.Controllers
{
    public class BoardsController : Controller
    {
        private readonly TaskBoardAppDbContext data;

        public BoardsController(TaskBoardAppDbContext context)
        {
            data = context;
        }
    
        public IActionResult All()
        {
            var boards = data.Boards
                .Select(b => new BoardViewModel()
                {
                    Id = b.Id,
                    Name = b.Name,
                    Tasks = b.Tasks.Select(t => new TaskViewModel()
                    {
                        Id = t.Id,
                        Title = t.Title,
                        Description = t.Description,
                        Owner = t.Owner.UserName
                    })
                })
                .ToList();

            return View(boards);
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
