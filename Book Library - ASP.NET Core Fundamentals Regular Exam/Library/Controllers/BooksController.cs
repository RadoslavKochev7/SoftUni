using Library.Contracts;
using Library.Models.Books;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Library.Controllers
{
    public class BooksController : Controller
    {
        private readonly IBookService bookService;

        public BooksController(IBookService bookService)
        {
            this.bookService = bookService;
        }

        [HttpGet]
        public async Task<IActionResult> Add()
        {
            var model = new BookAddModel()
            {
                Categories = await bookService.GetCategoriesAsync()
            };

            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> Add(BookAddModel bookAddModel)
        {
            if (!ModelState.IsValid)
            {
                return View(bookAddModel);
            }

            await bookService.AddBookAsync(bookAddModel);
            return RedirectToAction(nameof(All));
        }

        [HttpGet]
        public async Task<IActionResult> All()
        {
            var model = await bookService.GetAllBooksAsync();

            return View(model);
        }

        public async Task<IActionResult> AddToCollection(int bookId)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            await bookService.AddToCollectionAsync(bookId, userId!);

            return RedirectToAction(nameof(All));
        }

        public async Task<IActionResult> RemoveFromCollection(int bookId)
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            await bookService.RemoveFromCollectionAsync(bookId, userId!);

            return RedirectToAction(nameof(Mine));
        }

        public async Task<IActionResult> Mine()
        {
            var userId = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var model = await bookService.GetMyBooks(userId);

            return View("Mine", model);
        }
    }
}

