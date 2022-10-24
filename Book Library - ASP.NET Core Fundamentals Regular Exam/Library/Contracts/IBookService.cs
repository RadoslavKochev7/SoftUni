using Library.Data.Entities;
using Library.Models.Books;

namespace Library.Contracts
{
    public interface IBookService
    {
        Task AddBookAsync(BookAddModel model);
        Task<IEnumerable<Category>> GetCategoriesAsync();
        Task<IEnumerable<BookViewModel>> GetAllBooksAsync();
        Task AddToCollectionAsync(int bookId, string userId);
        Task RemoveFromCollectionAsync(int bookId, string userId);
        Task<IEnumerable<BookViewModel>> GetMyBooks(string userId);
    }
}
