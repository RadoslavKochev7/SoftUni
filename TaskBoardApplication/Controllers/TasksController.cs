using Microsoft.AspNetCore.Mvc;
using TaskBoardApplication.Data;
using TaskBoardApplication.Models.Tasks;
using TaskBoardApplication.Data.Entities;
using Task = TaskBoardApplication.Data.Entities.Task;
using System.Security.Claims;

namespace TaskBoardApplication.Controllers
{
    public class TasksController : Controller
    {
        private readonly TaskBoardAppDbContext data;

        public TasksController(TaskBoardAppDbContext context)
        {
            data = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        public  IActionResult Create()
        {
            TaskFormModel taskModel = new TaskFormModel()
            {
                Boards = GetBoards()
            };

            return View(taskModel);
        }

        [HttpPost]
        public IActionResult Create(TaskFormModel model)
        {
            if (!GetBoards().Any(b => b.Id == model.BoardId))
            {
                ModelState.AddModelError(nameof(model.BoardId), "Board does not exist");
            }

            string currentUserId = GetUserId();

            Task task = new Task()
            {
                Title = model.Title,
                Description = model.Description,
                CreatedOn = DateTime.Now,
                BoardId = model.BoardId,
                OwnerId = currentUserId,
            };

            data.Tasks.Add(task);
            data.SaveChanges();

            var boards = data.Boards;

            return RedirectToAction("All", "Boards");
        }

        public IActionResult Edit(int id)
        {
            Task task = data.Tasks.Find(id);

            if (task == null)
            {
                // When there isn't a task with the current id
                return BadRequest();
            }

            string currentUserId = GetUserId();

            if (currentUserId != task.OwnerId)
            {
                return Unauthorized();
            }

            var taskModel = new TaskFormModel()
            {
                Title = task.Title,
                Description = task.Description,
                BoardId = task.BoardId,
                Boards = GetBoards(),
            };

           return View(taskModel);
        }

        [HttpPost]
        public IActionResult Edit(int id, TaskFormModel model)
        {
            Task task = data.Tasks.Find(id);

            if (task == null)
            {
                // When there isn't a task with the current id
                return BadRequest();
            }

            string currentUserId = GetUserId();

            if (currentUserId != task.OwnerId)
            {
                return Unauthorized();
            }

            if (!GetBoards().Any(b => b.Id == model.BoardId))
            {
                ModelState.AddModelError(nameof(model.BoardId), "Board does not exist");
            }

            task.Title = model.Title;
            task.Description = model.Description;
            task.BoardId = model.BoardId;

            data.SaveChanges();

            return RedirectToAction("All", "Boards");
        }
        public IActionResult Details(int id)
        {
            var task = data.Tasks
                .Where(t => t.Id == id)
                .Select(t => new TaskDetailsViewModel()
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    CreatedOn = t.CreatedOn.ToString("dd/MM/yyyy HH:mm"),
                    Board = t.Board.Name,
                    Owner = t.Owner.UserName
                })
                .FirstOrDefault();

            if (task == null)
            {
                return BadRequest();
            }

            return View(task);
        }

        public IActionResult Delete(int id)
        {
            Task task = data.Tasks.Find(id);

            if (task == null)
            {
                // When there isn't a task with the current id
                return BadRequest();
            }

            string currentUserId = GetUserId();

            if (currentUserId != task.OwnerId)
            {
                return Unauthorized();
            }

            var taskModel = new TaskViewModel()
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description
            };

            return View(taskModel);
        }

        [HttpPost]
        public IActionResult Delete(int id, TaskViewModel model)
        {
            Task task = data.Tasks.Find(id);

            if (task == null)
            {
                // When there isn't a task with the current id
                return BadRequest();
            }

            string currentUserId = GetUserId();

            if (currentUserId != task.OwnerId)
            {
                return Unauthorized();
            }

            data.Tasks.Remove(task);
            data.SaveChanges();

            return RedirectToAction("All", "Boards");
        }
        private string GetUserId()
          => this.User.FindFirstValue(ClaimTypes.NameIdentifier);

        private IEnumerable<TaskBoardModel> GetBoards()
         => this.data.Boards.Select(b => new TaskBoardModel()
         {
             Id = b.Id,
             Name = b.Name
         });
    }
}
