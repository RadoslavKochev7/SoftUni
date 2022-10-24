using Library.Contracts;
using Library.Data;
using Library.Data.Entities;
using Library.Models.Books;
using Microsoft.EntityFrameworkCore;

namespace Library.Services
{
    public class BookService : IBookService
    {
        private readonly LibraryDbContext context;

        public BookService(LibraryDbContext context)
        {
            this.context = context;
        }

        public async Task AddBookAsync(BookAddModel model)
        {
            var entity = new Book()
            {
                Id = model.Id,
                Title = model.Title,
                Author = model.Author,
                Description = model.Description,
                ImageUrl = model.ImageUrl,
                Rating = model.Rating,
                CategoryId = model.CategoryId
            };

            entity.Category = context.Categories.FirstOrDefault(c => c.Id == entity.CategoryId); 

            await context.Books.AddAsync(entity);
            await context.SaveChangesAsync();
        }

        public async Task AddToCollectionAsync(int bookId, string userId)
        {
            var user = await context.Users
               .Where(u => u.Id == userId)
               .Include(u => u.ApplicationUsersBooks)
               .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User");
            }

            var book = await context.Books.FirstOrDefaultAsync(u => u.Id == bookId);

            if (book == null)
            {
                throw new ArgumentException("Invalid Book");
            }

            if (!user.ApplicationUsersBooks.Any(ub => ub.BookId == bookId))
            {
                var applicationUsersBook = new ApplicationUserBook()
                {
                    ApplicationUserId = userId,
                    BookId = bookId,
                };


                user.ApplicationUsersBooks.Add(applicationUsersBook);

                await context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<BookViewModel>> GetAllBooksAsync()
        {
            var entities = await context.Books.ToListAsync();

            return entities.Select(b => new BookViewModel()
            {
                Id = b.Id,
                Author = b.Author,
                Title = b.Title,
                ImageUrl = b.ImageUrl,
                CategoryId = b.CategoryId,
                Description = b.Description,
                Category = b.Category.Name,
                Rating = b.Rating
            });
        }

        public async Task<IEnumerable<Category>> GetCategoriesAsync()
          => await context.Categories.ToListAsync();

        public async Task<IEnumerable<BookViewModel>> GetMyBooks(string userId)
        {
            var user = await context.Users
               .Where(u => u.Id == userId)
               .Include(u => u.ApplicationUsersBooks)
               .ThenInclude(b => b.Book)
               .ThenInclude(c => c.Category)
               .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User Id");
            }

            return user.ApplicationUsersBooks
                .Select(b => new BookViewModel()
                {
                    Id = b.BookId,
                    Author = b.Book.Author,
                    Title = b.Book.Title,
                    ImageUrl = b.Book.ImageUrl,
                    Category = b.Book.Category.Name,
                    Rating = b.Book.Rating,
                    Description = b.Book.Description
                });
        }

        public async Task RemoveFromCollectionAsync(int bookId, string userId)
        {
            var user = await context.Users
                .Where(u => u.Id == userId)
                .Include(u => u.ApplicationUsersBooks)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                throw new ArgumentException("Invalid User Id");
            }

            var book = user.ApplicationUsersBooks.FirstOrDefault(u => u.BookId == bookId);

            if (book != null)
            {
                user.ApplicationUsersBooks.Remove(book);
                await context.SaveChangesAsync();
            }
        }

    }
}
